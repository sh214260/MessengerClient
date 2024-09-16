const conversationRepo = require('../Repositories/conversationRepo');

const getConversationById = async (id) => {
    try {
        const conversation = await conversationRepo.getConversationById(id);
        if (!conversation) return { success: false, message: "Conversation not found" };
        return { success: true, message: "Conversation retrieved", conversation };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const addConversation = async (newConversation) => {
    try {
        const status = await conversationRepo.addConversation(newConversation);
        return { success: true, message: status };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const getConversationsForUser = async (userId) => {
    try {
        const conversations = await conversationRepo.getConversationsForUser(userId);
        return { success: true, message: "Conversations retrieved", conversations };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

module.exports = { getConversationById, addConversation, getConversationsForUser };
