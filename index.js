const express = require('express');
const app = express();
const userController=require("./src/Controllers/userController")
const messageController=require("./src/Controllers/messageController")
const groupController=require("./src/Controllers/groupController")
const conversationController=require("./src/Controllers/conversationController")
require("./config/dbConfig")
app.use(express.json());

const cors = require('cors')
app.use(cors())
app.use('/users', userController);
app.use('/messages', messageController);
app.use('/groups', groupController);
app.use('/conversations', conversationController);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
