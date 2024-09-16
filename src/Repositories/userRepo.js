const userModel = require('../Models/userModel');

const getUserByEmail = async (email) => {
    return await userModel.findOne({ email: email });
}

const addUser = async (newUser) => {
    const user = new userModel(newUser);
    await user.save();
    return "Created";
}

const updateUser = async (id, newUser) => {
    await userModel.findByIdAndUpdate(id, newUser);
    return "Updated";
}

const getUserById = async (id) => {
    return await userModel.findById(id);
}

const getUserContacts = async (userId) => {
    const user = await userModel.findById(userId).lean();
    if (!user || !user.contacts || user.contacts.length === 0) {
        return [];
    }
    const contacts = await userModel.find({ _id: { $in: user.contacts } }, 'name email').lean();
    return contacts; // אנשי הקשר עם השדות name ו-email
};

module.exports = { getUserByEmail, addUser, updateUser, getUserById, getUserContacts };
