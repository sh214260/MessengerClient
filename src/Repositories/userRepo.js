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

const addContactToUser = async (userId, emailFriend) => {
    console.log("hi");

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return { success: false, message: "User not found" };
        }

        const friend = await userModel.findOne({ email: emailFriend });
        console.log(user);
        console.log(friend);
        if (!friend) {
            return { success: false, message: "Friend not found" };
        }

        if (user._id == friend._id) {
            return { success: false, message: "Unable to add yourself to contacts" };
        }
        // בדיקה אם איש הקשר כבר קיים
        if (user.contacts.includes(friend._id)) {
            return { success: false, message: "Contact already exists" };
        }


        user.contacts.push(friend._id);
        await user.save();

        return { success: true, message: "Contact added successfully" };
    } catch (error) {
        console.error("Error adding contact:", error);
        return { success: false, message: error.message };
    }
};


module.exports = { getUserByEmail, addUser, updateUser, getUserById, getUserContacts, addContactToUser };
