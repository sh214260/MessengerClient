const groupRepo = require('../Repositories/groupRepo');

const getGroupById = async (id) => {
    try {
        const group = await groupRepo.getGroupById(id);
        if (!group) return { success: false, message: "Group not found" };
        return { success: true, message: "Group retrieved", group };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const addGroup = async (newGroup) => {
    try {
        const status = await groupRepo.addGroup(newGroup);
        return { success: true, message: status };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const updateGroup = async (id, group) => {
    try {
        const status = await groupRepo.updateGroup(id, group);
        return { success: true, message: status };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const getGroupsForUser = async (userId) => {
    try {
        const groups = await groupRepo.getGroupsForUser(userId);
        return { success: true, message: "Groups retrieved", groups };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

module.exports = { getGroupById, addGroup, updateGroup, getGroupsForUser };
