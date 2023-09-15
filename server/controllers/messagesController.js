// Import Message model
const Message = require('../models/messageModel');

// Add message controller
module.exports.addMessage = async (req, res, next) => {
    try {
        const { sender, receiver, message } = req.body;
        // Add message to the database with sender and receiver ids
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

// Get all messages controller
module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { sender, receiver } = req.body;  
        // Get all messages between sender and receiver
        const messages = await Message.find({ users: { $all: [sender, receiver] } });

        // Project only required fields
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

