const groupService = require('../Services/groupService');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// יצירת קבוצה (נדרש JWT)
router.post('/create', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const newGroup = req.body;
        newGroup.creator = decoded.email; // אם נדרש, ניתן להוסיף מידע נוסף מה-JWT
        const result = await groupService.addGroup(newGroup);
        if (!result.success) return res.status(400).json({ message: result.message });
        return res.status(201).json({ message: "Group created successfully" });
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

// קבלת קבוצות של משתמש (נדרש JWT)
router.get('/user/:id', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const userId = req.params.id;
        const result = await groupService.getGroupsForUser(userId);
        if (!result.success) return res.status(404).json({ message: result.message });
        return res.json({ groups: result.groups });
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

// עדכון קבוצה (נדרש JWT)
router.put('/update/:id', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const groupId = req.params.id;
        const group = req.body;
        const result = await groupService.updateGroup(groupId, group);
        if (!result.success) return res.status(400).json({ message: result.message });
        return res.json({ message: "Group updated successfully" });
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

module.exports = router;
