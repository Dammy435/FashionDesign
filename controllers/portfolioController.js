// controllers/portfolioController.js
const PortfolioItem = require('../models/PortfolioItem');

exports.getAll = async (_, res) => {
    const items = await PortfolioItem.find().sort({ createdAt: -1 });
    res.json(items);
};

exports.create = async (req, res) => {
    const { title, description, tags } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newItem = await PortfolioItem.create({ title, description, tags, imageUrl });
    res.status(201).json(newItem);
};

exports.update = async (req, res) => {
    const item = await PortfolioItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    item.title = req.body.title || item.title;
    item.description = req.body.description || item.description;
    item.tags = req.body.tags || item.tags;
    if (req.file) item.imageUrl = `/uploads/${req.file.filename}`;

    await item.save();
    res.json(item);
};

exports.remove = async (req, res) => {
    const item = await PortfolioItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
};
