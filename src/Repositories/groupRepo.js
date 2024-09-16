const groupModel = require('../Models/groupModel');

const getGroupById = async (id) => {
    return await groupModel.findById(id);
}

const addGroup = async (newGroup) => {
    const group = new groupModel(newGroup);
    await group.save();
    return "Created";
}

const updateGroup = async (id, newGroup) => {
    await groupModel.findByIdAndUpdate(id, newGroup);
    return "Updated";
}

const getGroupsForUser = async (userId) => {
    return await groupModel.find({ members: userId }).populate('admin');
}

module.exports = { getGroupById, addGroup, updateGroup, getGroupsForUser };
