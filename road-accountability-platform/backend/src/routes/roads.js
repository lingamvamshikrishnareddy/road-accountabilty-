// Road routes
const express = require('express');
const router = express.Router();
const { getRoadByQR, getRoadDetails, listAllRoads } = require('../controllers/roadController');

// Get road by QR code
router.get('/qr/:qrCode', getRoadByQR);

// Get road by ID
router.get('/:id', getRoadDetails);

// List all roads
router.get('/', listAllRoads);

module.exports = router;