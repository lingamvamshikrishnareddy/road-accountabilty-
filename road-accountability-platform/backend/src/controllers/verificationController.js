// Verification controller
const {
  getVerificationQueue,
  getVerificationItemById,
  approveVerification,
  rejectVerification,
} = require('../services/supabaseService');

const getQueue = async (req, res) => {
  try {
    const queue = await getVerificationQueue();
    res.json({ success: true, data: queue });
  } catch (error) {
    console.error('Error fetching verification queue:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch verification queue' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getVerificationItemById(id);
    res.json({ success: true, data: item });
  } catch (error) {
    console.error('Error fetching verification item:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch verification item' });
  }
};

const approve = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const item = await approveVerification(id, userId);
    res.json({ success: true, data: item, message: 'Item approved successfully' });
  } catch (error) {
    console.error('Error approving verification:', error);
    res.status(500).json({ success: false, message: 'Failed to approve verification' });
  }
};

const reject = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, reason } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const item = await rejectVerification(id, userId, reason);
    res.json({ success: true, data: item, message: 'Item rejected successfully' });
  } catch (error) {
    console.error('Error rejecting verification:', error);
    res.status(500).json({ success: false, message: 'Failed to reject verification' });
  }
};

module.exports = {
  getQueue,
  getById,
  approve,
  reject,
};
