// Entity (Contractor) controller
const {
  getContractors,
  getContractorById,
  createContractor,
  updateContractor,
  deleteContractor,
} = require('../services/supabaseService');

const getAll = async (req, res) => {
  try {
    const { search } = req.query;
    const contractors = await getContractors({ search });
    res.json({ success: true, data: contractors });
  } catch (error) {
    console.error('Error fetching contractors:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contractors' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contractor = await getContractorById(id);
    res.json({ success: true, data: contractor });
  } catch (error) {
    console.error('Error fetching contractor:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contractor' });
  }
};

const create = async (req, res) => {
  try {
    const contractorData = req.body;
    const contractor = await createContractor(contractorData);
    res.status(201).json({ success: true, data: contractor });
  } catch (error) {
    console.error('Error creating contractor:', error);
    res.status(500).json({ success: false, message: 'Failed to create contractor' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const contractorData = req.body;
    const contractor = await updateContractor(id, contractorData);
    res.json({ success: true, data: contractor });
  } catch (error) {
    console.error('Error updating contractor:', error);
    res.status(500).json({ success: false, message: 'Failed to update contractor' });
  }
};

const deleteContractor_ = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteContractor(id);
    res.json({ success: true, message: 'Contractor deleted successfully' });
  } catch (error) {
    console.error('Error deleting contractor:', error);
    res.status(500).json({ success: false, message: 'Failed to delete contractor' });
  }
};

module.exports = {
  getAllContractors: getAll,
  getContractor: getById,
  createContractor: create,
  updateContractor: update,
  deleteContractor: deleteContractor_,
};
