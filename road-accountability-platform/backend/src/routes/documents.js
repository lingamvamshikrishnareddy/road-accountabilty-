// Document routes
const express = require('express');
const router = express.Router();
const { fileUpload } = require('../middleware/fileUpload');
const { getByRoad, getById, getAll, upload, deleteDocument, verify } = require('../controllers/documentController');

// Get documents by road ID
router.get('/', getByRoad);

// Get document by ID
router.get('/:id', getById);

// Upload document
router.post('/upload', fileUpload.single('file'), upload);

// Verify document
router.post('/:id/verify', verify);

// Delete document
router.delete('/:id', deleteDocument);

module.exports = router;
