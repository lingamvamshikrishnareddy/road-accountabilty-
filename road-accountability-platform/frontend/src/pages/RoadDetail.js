import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { roadsAPI, contractsAPI, incidentsAPI, documentsAPI } from '../services/api';
import './RoadDetail.css';

const RoadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [road, setRoad] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoadData();
  }, [id]);

  const fetchRoadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch road details
      const roadRes = await roadsAPI.getById(id);
      setRoad(roadRes.data.data || roadRes.data);

      // Fetch related data in parallel
      const [contractsRes, incidentsRes, documentsRes] = await Promise.allSettled([
        contractsAPI.getByRoad(id),
        incidentsAPI.getByRoad(id),
        documentsAPI.getByRoad?.(id),
      ]);

      if (contractsRes.status === 'fulfilled') {
        setContracts(contractsRes.value.data?.data || []);
      }
      if (incidentsRes.status === 'fulfilled') {
        setIncidents(incidentsRes.value.data?.data || []);
      }
      if (documentsRes.status === 'fulfilled') {
        setDocuments(documentsRes.value.data?.data || []);
      }
    } catch (err) {
      console.error('Error fetching road data:', err);
      setError(err.response?.data?.message || 'Failed to load road details');
      toast.error('Failed to load road details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="page-container loading">Loading road details...</div>;
  }

  if (error || !road) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Road Not Found</h2>
          <p>{error || 'This road does not exist or has been removed.'}</p>
          <button className="btn btn-primary" onClick={() => navigate('/roads')}>
            Back to Roads
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="road-header">
        <button className="btn btn-secondary btn-small" onClick={() => navigate('/roads')}>
          ← Back
        </button>
        <div className="road-title-section">
          <h1 className="page-title">{road.name || 'Unnamed Road'}</h1>
          <p className="road-code">Code: {road.code || 'N/A'}</p>
        </div>
      </div>

      {/* Road Overview Card */}
      <div className="road-overview-card card">
        <div className="overview-grid">
          <div className="overview-item">
            <label>Location</label>
            <p>{road.location || 'Not specified'}</p>
          </div>
          <div className="overview-item">
            <label>Length (km)</label>
            <p>{road.length || 'N/A'}</p>
          </div>
          <div className="overview-item">
            <label>Surface Type</label>
            <p>{road.surfaceType || 'Not specified'}</p>
          </div>
          <div className="overview-item">
            <label>Status</label>
            <p>
              <span className={`badge badge-${road.status === 'Good' ? 'success' : road.status === 'Fair' ? 'warning' : 'danger'}`}>
                {road.status || 'Unknown'}
              </span>
            </p>
          </div>
          <div className="overview-item">
            <label>Last Inspected</label>
            <p>{road.lastInspected ? new Date(road.lastInspected).toLocaleDateString() : 'Never'}</p>
          </div>
          <div className="overview-item">
            <label>Maintenance Priority</label>
            <p>{road.maintenancePriority || 'Medium'}</p>
          </div>
        </div>
        {road.description && (
          <div className="overview-description">
            <h3>Description</h3>
            <p>{road.description}</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'contracts' ? 'active' : ''}`}
            onClick={() => setActiveTab('contracts')}
          >
            Contracts ({contracts.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'incidents' ? 'active' : ''}`}
            onClick={() => setActiveTab('incidents')}
          >
            Incidents ({incidents.length})
          </button>
          <button
            className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents ({documents.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="tabs-content">
          {activeTab === 'overview' && (
            <div className="tab-pane">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{contracts.length}</div>
                  <div className="stat-label">Active Contracts</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{incidents.length}</div>
                  <div className="stat-label">Reported Incidents</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{documents.length}</div>
                  <div className="stat-label">Uploaded Documents</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'contracts' && (
            <div className="tab-pane">
              {contracts.length === 0 ? (
                <p className="no-data">No contracts found for this road.</p>
              ) : (
                <div className="grid-2">
                  {contracts.map(contract => (
                    <div key={contract.id} className="card">
                      <h3 className="card-title">{contract.contractorName || 'Unknown Contractor'}</h3>
                      <div className="card-content">
                        <p><strong>Contract ID:</strong> {contract.contractId || 'N/A'}</p>
                        <p><strong>Amount:</strong> ₹{contract.amount?.toLocaleString() || 'N/A'}</p>
                        <p><strong>Duration:</strong> {contract.duration || 'N/A'} months</p>
                        <p><strong>Status:</strong> {contract.status || 'Active'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'incidents' && (
            <div className="tab-pane">
              {incidents.length === 0 ? (
                <p className="no-data">No incidents reported for this road.</p>
              ) : (
                <div className="grid-2">
                  {incidents.map(incident => (
                    <div key={incident.id} className="card">
                      <h3 className="card-title">{incident.title || 'Unnamed Incident'}</h3>
                      <div className="card-content">
                        <p><strong>Type:</strong> {incident.type || 'Other'}</p>
                        <p><strong>Date:</strong> {incident.date ? new Date(incident.date).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Severity:</strong> {incident.severity || 'Medium'}</p>
                        <p><strong>Description:</strong> {incident.description || 'No details provided'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="tab-pane">
              {documents.length === 0 ? (
                <p className="no-data">No documents uploaded for this road.</p>
              ) : (
                <div className="grid-2">
                  {documents.map(doc => (
                    <div key={doc.id} className="card">
                      <h3 className="card-title">{doc.name || 'Unnamed Document'}</h3>
                      <div className="card-content">
                        <p><strong>Type:</strong> {doc.type || 'Unknown'}</p>
                        <p><strong>Uploaded:</strong> {doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Size:</strong> {doc.size ? `${(doc.size / 1024).toFixed(2)} KB` : 'N/A'}</p>
                      </div>
                      {doc.url && (
                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-small">
                          Download
                        </a>
                      )}
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

export default RoadDetail;
