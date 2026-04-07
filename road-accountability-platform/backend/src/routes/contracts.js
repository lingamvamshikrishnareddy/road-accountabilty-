// Contract routes
const express = require('express');
const router = express.Router();
const { getByRoad, getById, getAll, create, update, deleteContract } = require('../controllers/contractController');

// Get contracts by road ID
router.get('/', getByRoad);

// Get contract by ID
router.get('/:id', getById);

// Create contract
router.post('/', create);

// Update contract
router.put('/:id', update);

// Delete contract
router.delete('/:id', deleteContract);

module.exports = router;
