const messageModel = require('../Models/messageModel');

const getMessageById = async (id) => {
    return await messageModel.findById(id);
}

const addMessage = async (newMessage) => {
    const message = new messageModel(newMessage);
    await message.save();
    return "Created";
}

const getMessagesForUser = async (userId1, userId2) => {
    try {
        const messages = await messageModel.find({
            $or: [
                { sender: userId1, receiver: userId2 },
                { sender: userId2, receiver: userId1 }
            ]
        }).sort({ createdAt: 1 })  // מיון לפי תאריך מהישן לחדש
        .populate('sender')        // שליפת מידע מלא על השולח
        .populate('receiver');     // שליפת מידע מלא על המקבל
        
        return messages;
    } catch (error) {
        console.error('Error fetching messages for conversation:', error);
    }
}

const getMessagesForGroup = async (groupId) => {
    return await messageModel.find({ group: groupId }).populate('sender');
}

module.exports = { getMessageById, addMessage, getMessagesForUser, getMessagesForGroup };
