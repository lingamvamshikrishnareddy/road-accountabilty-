import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { documentsAPI } from '../services/api';
import toast from 'react-hot-toast';

const Upload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    document_type: '',
    road_id: '',
    file: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }
      setFormData({ ...formData, file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/auth');
      return;
    }

    setLoading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('title', formData.title);
      uploadData.append('description', formData.description);
      uploadData.append('document_type', formData.document_type);
      uploadData.append('road_id', formData.road_id);
      uploadData.append('file', formData.file);

      await documentsAPI.upload(uploadData);
      toast.success('Document uploaded successfully!');
      setFormData({
        title: '',
        description: '',
        document_type: '',
        road_id: '',
        file: null,
      });
    } catch (error) {
      toast.error('Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="page-container">
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h2>Sign In Required</h2>
          <p>You need to sign in to upload documents</p>
          <button
            onClick={() => navigate('/auth')}
            className="btn btn-primary"
            style={{ marginTop: '20px' }}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Upload Document</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label className="form-label">Document Type</label>
              <select
                name="document_type"
                className="form-select"
                value={formData.document_type}
                onChange={handleChange}
                required
              >
                <option value="">Select type</option>
                <option value="contract">Contract</option>
                <option value="bid">Bid Document</option>
                <option value="progress_report">Progress Report</option>
                <option value="incident_report">Incident Report</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Road ID</label>
              <input
                type="text"
                name="road_id"
                className="form-input"
                value={formData.road_id}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">File</label>
              <input
                type="file"
                className="form-input"
                onChange={handleFileChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={loading}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
