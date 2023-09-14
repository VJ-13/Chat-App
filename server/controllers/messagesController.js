const Message = require('../models/messageModel');

module.exports.addMessage = async (req, res, next) => {
    try {
        const { sender, receiver, message } = req.body;
        const data = await Message.create({
            message: {text:message},
            users: [sender, receiver],
            sender: sender,
        });
        if (data) {
            return res.json({ message: "Message added successfully" });
        }
        else {
            return res.json({ message: "Failed to add messages" });
        }     
    } catch (error) {
        next(error);
    }
};

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { sender, receiver } = req.body;  
        const messages = await Message.find({ users: { $all: [sender, receiver] } });
        const projectedMessages = messages ?.map((msg) => {
            return {
                senderSelf: msg.sender.toString() === sender,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (error) {
        next(error);
    }
};

