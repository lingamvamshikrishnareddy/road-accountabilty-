// Road controller for handling road-related operations
const { getRoadByQRCode, getRoadById, getAllRoads } = require('../services/supabaseService');

const getRoadByQR = async (req, res) => {
  try {
    const { qrCode } = req.params;
    const road = await getRoadByQRCode(qrCode);
    res.json({ success: true, data: road });
  } catch (error) {
    console.error('Error fetching road by QR code:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch road details' });
  }
};

const getRoadDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const road = await getRoadById(id);
    res.json({ success: true, data: road });
  } catch (error) {
    console.error('Error fetching road details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch road details' });
  }
};

const listAllRoads = async (req, res) => {
  try {
    const roads = await getAllRoads();
    res.json({ success: true, data: roads });
  } catch (error) {
    console.error('Error fetching roads:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch roads' });
  }
};

module.exports = {
  getRoadByQR,
  getRoadDetails,
  listAllRoads,
};