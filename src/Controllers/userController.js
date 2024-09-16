const userService = require('../Services/userService');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// התחברות
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await userService.getUserByEmail(email, password);
    console.log(result); 
    if (!result.success) return res.status(401).json({ message: result.message });
    const token = jwt.sign({ email }, "secret", { expiresIn: '1h' }); // Token expires in 1 hour
    return res.json({ token,user:result.user} );
});

// הרשמה
router.post('/signup', async (req, res) => {
    const newUser = req.body;
    const result = await userService.addUser(newUser);
    if (!result.success) return res.status(400).json({ message: result.message });
    return res.status(201).json({ message: "User registered successfully" });
});

// עדכון פרטי משתמש
router.put('/update/:id', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const userId = req.params.id;
        const newUser = req.body;

        // אפשרות לבדוק אם המשתמש הוא הבעלים של הנתונים
        if (decoded.email) {
            const result = await userService.updateUser(userId, newUser);
            if (!result.success) return res.status(400).json({ message: result.message });
            return res.json({ result });
        } else {
            return res.status(403).json({ message: "Unauthorized" });
        }
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

// קבלת רשימת אנשי קשר (נדרש JWT)
router.get('/:id/contacts', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {        
        const decoded = jwt.verify(token, "secret");    
        const userId = req.params.id;
        // אפשרות לבדוק אם המשתמש הוא הבעלים של הנתונים
        if (decoded.email) {
            const result = await userService.getUserContacts(userId);
            console.log(result);
            if (!result.success) return res.status(404).json({ message: result.message });
            return res.json({ contacts: result.contacts });
        } else {
            return res.status(403).json({ message: "Unauthorized" });
        }
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

router.post('/:id/contacts', async (req, res) => {
    
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const userId = req.params.id;
        const { emailFriend } = req.body;

        if (decoded.email) {
            const result = await userService.addContactToUser(userId, emailFriend);
            if (!result.success) return res.status(400).json({ message: result.message, success:false });
            return res.json({ message: result.message, success:true });
        } else {
            return res.status(403).json({ message: "Unauthorized", success:false });
        }
    } catch (e) {
        return res.status(401).json({ message: e.message, success:false });
    }
});


module.exports = router;
