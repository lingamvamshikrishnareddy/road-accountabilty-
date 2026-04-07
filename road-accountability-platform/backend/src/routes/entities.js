// Entity (Contractor) routes
const express = require('express');
const router = express.Router();
const { getAllContractors, getContractor, createContractor, updateContractor, deleteContractor } = require('../controllers/entityController');

// Get all contractors
router.get('/contractors', getAllContractors);

// Get contractor by ID
router.get('/contractors/:id', getContractor);

// Create contractor
router.post('/contractors', createContractor);

// Update contractor
router.put('/contractors/:id', updateContractor);

// Delete contractor
router.delete('/contractors/:id', deleteContractor);

module.exports = router;
