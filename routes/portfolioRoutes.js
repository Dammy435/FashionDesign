const express = require('express');
const { getAll, create, update, remove } = require('../controllers/portfolioController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.get('/', getAll);
router.post('/', protect, upload.single('image'), create);
router.put('/:id', protect, upload.single('image'), update);
router.delete('/:id', protect, remove);

module.exports = router;
