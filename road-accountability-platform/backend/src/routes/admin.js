// Admin routes
const express = require('express');
const router = express.Router();
const { getStats, getUsers, updateUserStatus, getVerificationQueue, getAnalytics } = require('../controllers/adminController');

// Get statistics
router.get('/stats', getStats);

// Get all users
router.get('/users', getUsers);

// Update user status
router.put('/users/:userId', updateUserStatus);

// Get verification queue
router.get('/verification-queue', getVerificationQueue);

// Get analytics
router.get('/analytics', getAnalytics);

module.exports = router;
