import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { roadsAPI } from '../services/api';

const RoadList = () => {
  const [roads, setRoads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoads();
  }, []);

  const fetchRoads = async () => {
    try {
      setLoading(true);
      const response = await roadsAPI.getAll();
      setRoads(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Road Projects</h1>

      {error && <div className="error-message">Error: {error}</div>}
      {loading && <div className="loading"><div className="spinner"></div> Loading roads...</div>}
      {!loading && !error && roads.length === 0 && (
        <div className="error-message">No roads found. Backend might not be running on port 5000.</div>
      )}

      {!loading && roads.length > 0 && (
        <div className="grid-2">
          {roads.map((road) => (
            <div key={road.id} className="card">
              <h3 className="card-title">{road.name}</h3>
              <p className="card-description">{road.description}</p>
              <div style={{ marginBottom: '15px' }}>
                <span className="badge badge-info">Status: {road.status || 'Unknown'}</span>
              </div>
              <Link to={`/roads/${road.id}`} className="btn btn-small">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadList;
