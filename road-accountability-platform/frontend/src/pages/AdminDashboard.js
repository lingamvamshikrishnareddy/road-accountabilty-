import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';
import { adminAPI } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [verificationQueue, setVerificationQueue] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to access admin dashboard');
      navigate('/auth');
      return;
    }
    loadAdminData();
  }, [user, navigate]);

  const loadAdminData = async () => {
    try {
      setLoading(true);

      // Load stats
      try {
        const statsRes = await adminAPI.getStats();
        setStats(statsRes.data.data || statsRes.data);
      } catch (err) {
        console.error('Error loading stats:', err);
      }

      // Load users
      try {
        const usersRes = await adminAPI.getUsers();
        setUsers(usersRes.data.data || []);
      } catch (err) {
        console.error('Error loading users:', err);
      }

      // Load verification queue
      try {
        const queueRes = await adminAPI.getVerificationQueue();
        setVerificationQueue(queueRes.data.data || []);
      } catch (err) {
        console.error('Error loading verification queue:', err);
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveUser = async (userId) => {
    try {
      await adminAPI.updateUser(userId, { status: 'approved' });
      toast.success('User approved');
      loadAdminData();
    } catch (err) {
      toast.error('Failed to approve user');
    }
  };

  const handleRejectUser = async (userId) => {
    try {
      await adminAPI.updateUser(userId, { status: 'rejected' });
      toast.success('User rejected');
      loadAdminData();
    } catch (err) {
      toast.error('Failed to reject user');
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="page-container loading">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Manage platform content and users</p>
      </div>

      {/* Stats Cards */}
      <div className="admin-stats-grid">
        <div className="card stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <p className="stat-value">{stats?.pendingVerifications || 0}</p>
            <p className="stat-name">Pending Verifications</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <p className="stat-value">{stats?.flaggedDocuments || 0}</p>
            <p className="stat-name">Flagged Documents</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <p className="stat-value">{stats?.activeUsers || 0}</p>
            <p className="stat-name">Active Users</p>
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-info">
            <p className="stat-value">{stats?.totalDocuments || 0}</p>
            <p className="stat-name">Total Documents</p>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="admin-tabs">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users ({users.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'verification' ? 'active' : ''}`}
            onClick={() => setActiveTab('verification')}
          >
            Verification Queue ({verificationQueue.length})
          </button>
        </div>

        <div className="tabs-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <h2>Admin Tools</h2>
              <div className="admin-tools-grid">
                <div className="tool-card card">
                  <div className="tool-icon">👥</div>
                  <h3>User Management</h3>
                  <p>Manage user accounts, roles, and permissions across the platform.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveTab('users')}
                  >
                    Manage Users
                  </button>
                </div>

                <div className="tool-card card">
                  <div className="tool-icon">✅</div>
                  <h3>Verification Queue</h3>
                  <p>Review and approve pending document verifications and user submissions.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveTab('verification')}
                  >
                    Review Queue
                  </button>
                </div>

                <div className="tool-card card">
                  <div className="tool-icon">📊</div>
                  <h3>Data Review</h3>
                  <p>Review flagged data, handle disputes, and ensure data quality.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveTab('overview')}
                  >
                    Review Data
                  </button>
                </div>

                <div className="tool-card card">
                  <div className="tool-icon">📈</div>
                  <h3>Analytics</h3>
                  <p>View comprehensive platform statistics and usage analytics.</p>
                  <button
                    className="btn btn-primary"
                    onClick={() => setActiveTab('overview')}
                  >
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="tab-pane">
              <h2>User Management</h2>
              {users.length === 0 ? (
                <p className="no-data">No users found</p>
              ) : (
                <div className="users-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Joined</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id}>
                          <td className="email-cell">{user.email}</td>
                          <td>{user.role || 'User'}</td>
                          <td>
                            <span className={`badge badge-${user.status === 'active' ? 'success' : user.status === 'pending' ? 'warning' : 'danger'}`}>
                              {user.status || 'unknown'}
                            </span>
                          </td>
                          <td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                          <td className="actions-cell">
                            {user.status === 'pending' && (
                              <>
                                <button
                                  className="btn btn-small btn-primary"
                                  onClick={() => handleApproveUser(user.id)}
                                >
                                  Approve
                                </button>
                                <button
                                  className="btn btn-small btn-ghost"
                                  onClick={() => handleRejectUser(user.id)}
                                  style={{ marginLeft: '8px' }}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Verification Queue Tab */}
          {activeTab === 'verification' && (
            <div className="tab-pane">
              <h2>Verification Queue</h2>
              {verificationQueue.length === 0 ? (
                <p className="no-data">No pending verifications</p>
              ) : (
                <div className="grid-2">
                  {verificationQueue.map(item => (
                    <div key={item.id} className="card verification-card">
                      <h3 className="card-title">{item.documentName || 'Document'}</h3>
                      <div className="card-content">
                        <p>
                          <strong>Submitted By:</strong> {item.submittedBy || 'Unknown'}
                        </p>
                        <p>
                          <strong>Date:</strong> {item.submittedDate ? new Date(item.submittedDate).toLocaleDateString() : 'N/A'}
                        </p>
                        <p>
                          <strong>Type:</strong> {item.documentType || 'Unknown'}
                        </p>
                        <p>
                          <strong>Status:</strong>{' '}
                          <span className="badge badge-warning">{item.status || 'Pending'}</span>
                        </p>
                      </div>
                      <div className="card-footer">
                        <button className="btn btn-primary btn-small">
                          Review Document
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
