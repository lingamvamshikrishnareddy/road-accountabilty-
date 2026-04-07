import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { roadsAPI, entitiesAPI } from '../services/api';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [results, setResults] = useState({
    roads: [],
    contractors: [],
    documents: [],
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    try {
      setLoading(true);
      setHasSearched(true);
      const newResults = {
        roads: [],
        contractors: [],
        documents: [],
      };

      const searchLower = searchTerm.toLowerCase();

      // Search roads
      if (searchType === 'all' || searchType === 'roads') {
        try {
          const roadsRes = await roadsAPI.getAll();
          const allRoads = roadsRes.data.data || [];
          newResults.roads = allRoads.filter(
            road =>
              road.name?.toLowerCase().includes(searchLower) ||
              road.code?.toLowerCase().includes(searchLower) ||
              road.location?.toLowerCase().includes(searchLower)
          );
        } catch (err) {
          console.error('Error searching roads:', err);
        }
      }

      // Search contractors
      if (searchType === 'all' || searchType === 'contractors') {
        try {
          const contractorsRes = await entitiesAPI.getContractors({
            search: searchTerm,
          });
          newResults.contractors = contractorsRes.data.data || [];
        } catch (err) {
          console.error('Error searching contractors:', err);
        }
      }

      setResults(newResults);

      const totalResults =
        newResults.roads.length +
        newResults.contractors.length +
        newResults.documents.length;
      
      if (totalResults === 0) {
        toast.success('No results found for your search');
      } else {
        toast.success(`Found ${totalResults} result(s)`);
      }
    } catch (err) {
      console.error('Search error:', err);
      toast.error('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalResults =
    results.roads.length + results.contractors.length + results.documents.length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Search</h1>
        <p className="page-subtitle">Find roads, contractors, and documents</p>
      </div>

      <div className="search-container">
        <form onSubmit={handleSearch} className="search-form card">
          <div className="form-group">
            <label className="form-label">Search Term</label>
            <input
              type="text"
              className="form-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter a road name, code, contractor name, or location..."
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Search In</label>
            <select
              className="form-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="roads">Roads Only</option>
              <option value="contractors">Contractors Only</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {hasSearched && (
        <div className="search-results">
          {totalResults === 0 ? (
            <div className="no-results">
              <p>No results found for "{searchTerm}"</p>
              <p className="no-results-hint">
                Try different keywords or check the spelling
              </p>
            </div>
          ) : (
            <>
              <div className="results-summary">
                Found <strong>{totalResults}</strong> result{totalResults !== 1 ? 's' : ''}
              </div>

              {/* Roads Results */}
              {results.roads.length > 0 && (
                <div className="results-section">
                  <h2 className="results-section-title">
                    Roads ({results.roads.length})
                  </h2>
                  <div className="grid-2">
                    {results.roads.map(road => (
                      <Link
                        key={road.id}
                        to={`/roads/${road.id}`}
                        className="card search-result-card"
                      >
                        <h3 className="card-title">{road.name}</h3>
                        <div className="search-result-meta">
                          <span className="meta-item">
                            <strong>Code:</strong> {road.code}
                          </span>
                          <span className="meta-item">
                            <strong>Location:</strong> {road.location}
                          </span>
                          {road.length && (
                            <span className="meta-item">
                              <strong>Length:</strong> {road.length} km
                            </span>
                          )}
                          {road.status && (
                            <span className="meta-item">
                              <strong>Status:</strong>{' '}
                              <span
                                className={`badge badge-${
                                  road.status === 'Good'
                                    ? 'success'
                                    : road.status === 'Fair'
                                    ? 'warning'
                                    : 'danger'
                                }`}
                              >
                                {road.status}
                              </span>
                            </span>
                          )}
                        </div>
                        <div className="search-result-action">
                          View Details →
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Contractors Results */}
              {results.contractors.length > 0 && (
                <div className="results-section">
                  <h2 className="results-section-title">
                    Contractors ({results.contractors.length})
                  </h2>
                  <div className="grid-2">
                    {results.contractors.map(contractor => (
                      <div key={contractor.id} className="card">
                        <h3 className="card-title">{contractor.name}</h3>
                        <div className="search-result-meta">
                          {contractor.email && (
                            <p>
                              <strong>Email:</strong> {contractor.email}
                            </p>
                          )}
                          {contractor.phone && (
                            <p>
                              <strong>Phone:</strong> {contractor.phone}
                            </p>
                          )}
                          {contractor.address && (
                            <p>
                              <strong>Address:</strong> {contractor.address}
                            </p>
                          )}
                          {contractor.licenseNumber && (
                            <p>
                              <strong>License:</strong> {contractor.licenseNumber}
                            </p>
                          )}
                        </div>
                        {contractor.status && (
                          <span className={`badge badge-${contractor.status === 'Active' ? 'success' : 'danger'}`}>
                            {contractor.status}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {!hasSearched && (
        <div className="search-placeholder">
          <div className="placeholder-icon">🔍</div>
          <p className="placeholder-text">Start searching to find roads, contractors, and more</p>
        </div>
      )}
    </div>
  );
};

export default Search;
