const mongoose = require('mongoose');

const chatroomSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    ],
});

const Chatroom = mongoose.model('Chatroom', chatroomSchema);

module.exports = Chatroom;
