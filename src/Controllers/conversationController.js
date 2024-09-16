const conversationService = require('../Services/conversationService');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// קבלת שיחה לפי מזהה (נדרש JWT)
router.get('/:id', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const conversationId = req.params.id;
        const result = await conversationService.getConversationById(conversationId);
        if (!result.success) return res.status(404).json({ message: result.message });
        return res.json({ conversation: result.conversation });
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

// קבלת שיחות של משתמש (נדרש JWT)
router.get('/user/:id', async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        const decoded = jwt.verify(token, "secret");
        const userId = req.params.id;
        const result = await conversationService.getConversationsForUser(userId);
        if (!result.success) return res.status(404).json({ message: result.message });
        return res.json({ conversations: result.conversations });
    } catch (e) {
        return res.status(401).json({ message: e.message });
    }
});

module.exports = router;
