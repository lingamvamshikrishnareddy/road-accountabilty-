// Document controller
const {
  getDocumentsByRoad,
  getDocumentById,
  getAllDocuments,
  createDocument,
  deleteDocument,
} = require('../services/supabaseService');

const getByRoad = async (req, res) => {
  try {
    const { roadId } = req.query;
    if (!roadId) {
      return res.status(400).json({ success: false, message: 'Road ID is required' });
    }
    const documents = await getDocumentsByRoad(roadId);
    res.json({ success: true, data: documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch documents' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const document = await getDocumentById(id);
    res.json({ success: true, data: document });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch document' });
  }
};

const getAll = async (req, res) => {
  try {
    const documents = await getAllDocuments();
    res.json({ success: true, data: documents });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch documents' });
  }
};

const upload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file provided' });
    }

    const { roadId, documentType, description, uploadedBy } = req.body;

    if (!roadId) {
      return res.status(400).json({ success: false, message: 'Road ID is required' });
    }

    const documentData = {
      road_id: roadId,
      name: req.file.originalname,
      type: documentType || 'other',
      description: description || '',
      file_path: req.file.path,
      file_size: req.file.size,
      uploaded_by: uploadedBy,
      status: 'pending',
      created_at: new Date(),
    };

    const document = await createDocument(documentData);
    res.status(201).json({ success: true, data: document, message: 'Document uploaded successfully' });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ success: false, message: 'Failed to upload document' });
  }
};

const deleteDocument_ = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDocument(id);
    res.json({ success: true, message: 'Document deleted successfully' });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ success: false, message: 'Failed to delete document' });
  }
};

const verify = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, verifiedBy } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    // Get the supabase service to update
    const { createClient } = require('@supabase/supabase-js');
    const { SUPABASE_URL, SUPABASE_KEY } = require('../config/env');
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const updateData = {
      status: status,
      verified_by: verifiedBy,
      verified_at: new Date(),
    };

    const { data, error } = await supabase
      .from('documents')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) throw error;

    res.json({ success: true, data: data[0] });
  } catch (error) {
    console.error('Error verifying document:', error);
    res.status(500).json({ success: false, message: 'Failed to verify document' });
  }
};

module.exports = {
  getByRoad,
  getById,
  getAll,
  upload,
  deleteDocument: deleteDocument_,
  verify,
};

