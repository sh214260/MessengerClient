const messageRepo = require('../Repositories/messageRepo');

const getMessageById = async (id) => {
    try {
        const message = await messageRepo.getMessageById(id);
        if (!message) return { success: false, message: "Message not found" };
        return { success: true, message: "Message retrieved", message };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const addMessage = async (newMessage) => {
    try {
        const status = await messageRepo.addMessage(newMessage);
        return { success: true, message: status };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const getMessagesForUser = async (userId1, userId2) => {
    try {
        const messages = await messageRepo.getMessagesForUser(userId1, userId2);
        return { success: true, message: "Messages retrieved", messages };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

module.exports = { getMessageById, addMessage, getMessagesForUser };
