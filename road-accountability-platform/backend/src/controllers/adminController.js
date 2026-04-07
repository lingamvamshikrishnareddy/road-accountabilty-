// Admin controller
const {
  getAdminStats,
  getAllUsers,
  updateUser,
} = require('../services/supabaseService');

const getStats = async (req, res) => {
  try {
    const stats = await getAdminStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch statistics' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = req.body;

    if (!userData.status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const user = await updateUser(userId, userData);
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

const getVerificationQueue = async (req, res) => {
  try {
    const { getVerificationQueue: getQueue } = require('../services/supabaseService');
    const queue = await getQueue();
    res.json({ success: true, data: queue });
  } catch (error) {
    console.error('Error fetching verification queue:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch verification queue' });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const stats = await getAdminStats();
    res.json({ success: true, data: { ...stats } });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
};

module.exports = {
  getStats,
  getUsers,
  updateUserStatus,
  getVerificationQueue,
  getAnalytics,
};
