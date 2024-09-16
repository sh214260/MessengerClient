const messageService = require('../Services/messageService');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../Models/userModel');
// שליחת הודעה (נדרש JWT)
router.post('/send', async (req, res) => {
    console.log("send");

    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const { sender, receiver, group, content, read } = req.body;

        try {
            const newMessage = {
                sender: (new mongoose.Types.ObjectId(sender)),
                receiver: (new mongoose.Types.ObjectId(receiver)),
                group: group ? group : null, // אם group לא מסופק, לא לכלול אותו
                content,
                read
            }
            console.log("new", newMessage);
            console.log(User);
            
            const senderUser = await User.findOne({ email: decoded.email });
            console.log(senderUser);
            
            if (!senderUser) return res.status(400).json({ message: "Sender not found" });
            newMessage.sender = senderUser._id; // השתמש ב-ObjectId של השולח
            const result = await messageService.addMessage(newMessage);
            if (!result.success) return res.status(400).json({ message: result.message });
            return res.status(201).json({ message: "Message sent successfully" });
        } catch (err) {
            return res.status(401).json({ message: err.message });
        }

    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

router.get('/conversation/:userId/:friendId', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");

        const { userId, friendId } = req.params;
        if (!decoded) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const result = await messageService.getMessagesForUser(userId, friendId);
        if (!result.success) return res.status(404).json({ message: result.message });

        return res.json({ messages: result.messages });
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});


// קבלת הודעות עבור קבוצה (נדרש JWT)
router.get('/group/:id', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const groupId = req.params.id;
        const result = await messageService.getMessagesForGroup(groupId);
        if (!result.success) return res.status(404).json({ message: result.message });
        return res.json({ messages: result.messages });
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

module.exports = router;
