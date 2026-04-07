// Contract controller
const {
  getContractsByRoad,
  getContractById,
  getAllContracts,
  createContract,
  updateContract,
  deleteContract,
} = require('../services/supabaseService');

const getByRoad = async (req, res) => {
  try {
    const { roadId } = req.query;
    if (!roadId) {
      return res.status(400).json({ success: false, message: 'Road ID is required' });
    }
    const contracts = await getContractsByRoad(roadId);
    res.json({ success: true, data: contracts });
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contracts' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contract = await getContractById(id);
    res.json({ success: true, data: contract });
  } catch (error) {
    console.error('Error fetching contract:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contract' });
  }
};

const getAll = async (req, res) => {
  try {
    const contracts = await getAllContracts();
    res.json({ success: true, data: contracts });
  } catch (error) {
    console.error('Error fetching contracts:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch contracts' });
  }
};

const create = async (req, res) => {
  try {
    const contractData = req.body;
    const contract = await createContract(contractData);
    res.status(201).json({ success: true, data: contract });
  } catch (error) {
    console.error('Error creating contract:', error);
    res.status(500).json({ success: false, message: 'Failed to create contract' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const contractData = req.body;
    const contract = await updateContract(id, contractData);
    res.json({ success: true, data: contract });
  } catch (error) {
    console.error('Error updating contract:', error);
    res.status(500).json({ success: false, message: 'Failed to update contract' });
  }
};

const deleteContract_ = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteContract(id);
    res.json({ success: true, message: 'Contract deleted successfully' });
  } catch (error) {
    console.error('Error deleting contract:', error);
    res.status(500).json({ success: false, message: 'Failed to delete contract' });
  }
};

module.exports = {
  getByRoad,
  getById,
  getAll,
  create,
  update,
  deleteContract: deleteContract_,
};
