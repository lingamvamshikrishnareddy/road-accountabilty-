// Incident routes
const express = require('express');
const router = express.Router();
const { getByRoad, getById, getAll, create, update, deleteIncident } = require('../controllers/incidentController');

// Get incidents by road ID
router.get('/', getByRoad);

// Get incident by ID
router.get('/:id', getById);

// Create incident
router.post('/', create);

// Update incident
router.put('/:id', update);

// Delete incident
router.delete('/:id', deleteIncident);

module.exports = router;
