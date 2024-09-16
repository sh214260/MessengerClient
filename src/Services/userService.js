const userRepo = require('../Repositories/userRepo');

const getUserByEmail = async (email, password) => {
    try {
        const user = await userRepo.getUserByEmail(email);
        if (!user) return { success: false, message: "User not found" };
        if (user.password !== password) return { success: false, message: "Wrong password" };
        return { success: true, message: "Login successful", user };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const addUser = async (newUser) => {
    try {
        const status = await userRepo.addUser(newUser);
        return { success: true, message: status };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

const updateUser = async (id, user) => {
    try {
        const status = await userRepo.updateUser(id, user);
        return { success: true, message: status };
    } catch (e) {
        return { success: false, message: e.message };
    }
}
const getUserContacts = async (userId) => {
    try {
        const contacts = await userRepo.getUserContacts(userId)
        return { success: true, message: "suc", contacts };
    } catch (e) {
        return { success: false, message: e.message };
    }
}
const addContactToUser = async (userId, emailFriend) => {
    try {
        const result = await userRepo.addContactToUser(userId, emailFriend)
        return { success: result.success, message: result.message };
    } catch (error) {
        console.error("Error adding contact:", error);
        return { success: false, message: error.message };
    }
};


module.exports = { getUserByEmail, addUser, updateUser, getUserContacts, addContactToUser };
