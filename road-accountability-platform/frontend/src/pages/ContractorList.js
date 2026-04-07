import React, { useState, useEffect } from 'react';
import { entitiesAPI } from '../services/api';

const ContractorList = () => {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContractors();
  }, []);

  const fetchContractors = async () => {
    try {
      setLoading(true);
      const response = await entitiesAPI.getContractors({});
      setContractors(response.data?.contractors || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Contractors</h1>

      {error && <div className="error-message">Error: {error}</div>}
      {loading && <div className="loading"><div className="spinner"></div> Loading contractors...</div>}
      {!loading && contractors.length === 0 && (
        <div className="error-message">No contractors found.</div>
      )}

      {!loading && contractors.length > 0 && (
        <div className="grid-2">
          {contractors.map((contractor) => (
            <div key={contractor.id} className="card">
              <h3 className="card-title">{contractor.name}</h3>
              <p className="card-description">{contractor.description || 'No description'}</p>
              {contractor.email && <p><strong>Email:</strong> {contractor.email}</p>}
              {contractor.phone && <p><strong>Phone:</strong> {contractor.phone}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractorList;
