const conversationModel = require('../Models/conversationModel');

const getConversationById = async (id) => {
    return await conversationModel.findById(id);
}

const addConversation = async (newConversation) => {
    const conversation = new conversationModel(newConversation);
    await conversation.save();
    return "Created";
}

const getConversationsForUser = async (userId) => {
    return await conversationModel.find({ participants: userId }).populate('participants');
}

module.exports = { getConversationById, addConversation, getConversationsForUser };
