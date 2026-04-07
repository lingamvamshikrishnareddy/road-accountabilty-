// Verification routes
const express = require('express');
const router = express.Router();
const { getQueue, getById, approve, reject } = require('../controllers/verificationController');

// Get verification queue
router.get('/queue', getQueue);

// Get verification item by ID
router.get('/:id', getById);

// Approve verification
router.post('/:id/approve', approve);

// Reject verification
router.post('/:id/reject', reject);

module.exports = router;
