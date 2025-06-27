const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' });

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'User exists' });

    const user = await User.create({ username, password });
    res.status(201).json({ token: generateToken(user._id) });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({ token: generateToken(user._id) });
};
