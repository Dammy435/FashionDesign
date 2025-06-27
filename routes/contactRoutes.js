const express = require('express');
const { sendMessage, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', sendMessage);
router.get('/', protect, getMessages); // only admin

module.exports = router;
