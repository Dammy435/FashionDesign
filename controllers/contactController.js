// controllers/contactController.js
const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    const { name, email, message } = req.body;
    const saved = await Message.create({ name, email, message });
    res.status(201).json(saved);
};

exports.getMessages = async (_, res) => {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
};
