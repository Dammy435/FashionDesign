const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    tags: [String],
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PortfolioItem', portfolioItemSchema);
