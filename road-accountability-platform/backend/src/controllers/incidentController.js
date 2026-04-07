// Incident controller
const {
  getIncidentsByRoad,
  getIncidentById,
  getAllIncidents,
  createIncident,
  updateIncident,
  deleteIncident,
} = require('../services/supabaseService');

const getByRoad = async (req, res) => {
  try {
    const { roadId } = req.query;
    if (!roadId) {
      return res.status(400).json({ success: false, message: 'Road ID is required' });
    }
    const incidents = await getIncidentsByRoad(roadId);
    res.json({ success: true, data: incidents });
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch incidents' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await getIncidentById(id);
    res.json({ success: true, data: incident });
  } catch (error) {
    console.error('Error fetching incident:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch incident' });
  }
};

const getAll = async (req, res) => {
  try {
    const incidents = await getAllIncidents();
    res.json({ success: true, data: incidents });
  } catch (error) {
    console.error('Error fetching incidents:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch incidents' });
  }
};

const create = async (req, res) => {
  try {
    const incidentData = req.body;
    const incident = await createIncident(incidentData);
    res.status(201).json({ success: true, data: incident });
  } catch (error) {
    console.error('Error creating incident:', error);
    res.status(500).json({ success: false, message: 'Failed to create incident' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const incidentData = req.body;
    const incident = await updateIncident(id, incidentData);
    res.json({ success: true, data: incident });
  } catch (error) {
    console.error('Error updating incident:', error);
    res.status(500).json({ success: false, message: 'Failed to update incident' });
  }
};

const deleteIncident_ = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteIncident(id);
    res.json({ success: true, message: 'Incident deleted successfully' });
  } catch (error) {
    console.error('Error deleting incident:', error);
    res.status(500).json({ success: false, message: 'Failed to delete incident' });
  }
};

module.exports = {
  getByRoad,
  getById,
  getAll,
  create,
  update,
  deleteIncident: deleteIncident_,
};
