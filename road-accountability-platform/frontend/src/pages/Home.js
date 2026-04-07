import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { roadsAPI, adminAPI, entitiesAPI } from '../services/api';

const Home = () => {
  const [stats, setStats] = useState({
    roads: 0,
    contractors: 0,
    documents: 0,
    incidents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const newStats = {
        roads: 0,
        contractors: 0,
        documents: 0,
        incidents: 0,
      };

      // Load roads count
      try {
        const roadsRes = await roadsAPI.getAll();
        newStats.roads = roadsRes.data.data?.length || 0;
      } catch (err) {
        console.error('Error loading roads:', err);
        newStats.roads = 0;
      }

      // Load contractors count
      try {
        const contractorsRes = await entitiesAPI.getContractors({});
        newStats.contractors = contractorsRes.data.data?.length || 0;
      } catch (err) {
        console.error('Error loading contractors:', err);
        newStats.contractors = 0;
      }

      // Load admin stats (documents and incidents)
      try {
        const adminRes = await adminAPI.getStats();
        newStats.documents = adminRes.data.data?.documentsCount || 0;
        newStats.incidents = adminRes.data.data?.incidentsCount || 0;
      } catch (err) {
        console.error('Error loading admin stats:', err);
      }

      setStats(newStats);
    } catch (err) {
      console.error('Error loading statistics:', err);
      toast.error('Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <h2>Road Accountability Platform</h2>
          <p>Tracking infrastructure, ensuring transparency, empowering citizens</p>
          <div className="hero-buttons">
            <Link to="/roads" className="btn btn-primary">Browse Roads</Link>
            <Link to="/upload" className="btn btn-secondary">Upload Document</Link>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="stats-section">
          <h3>Platform Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <p className="stat-number">
                {loading ? '—' : stats.roads.toLocaleString()}
              </p>
              <p className="stat-label">Road Projects</p>
            </div>
            <div className="stat-card">
              <p className="stat-number">
                {loading ? '—' : stats.contractors.toLocaleString()}
              </p>
              <p className="stat-label">Contractors</p>
            </div>
            <div className="stat-card">
              <p className="stat-number">
                {loading ? '—' : stats.documents.toLocaleString()}
              </p>
              <p className="stat-label">Documents</p>
            </div>
            <div className="stat-card">
              <p className="stat-number">
                {loading ? '—' : stats.incidents.toLocaleString()}
              </p>
              <p className="stat-label">Incidents Reported</p>
            </div>
          </div>
        </section>

        <section style={{ marginTop: '60px', marginBottom: '60px' }}>
          <h2 style={{ marginBottom: '30px', fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>Key Features</h2>
          <div className="grid-3">
            <div className="card">
              <h3 className="card-title">📊 Comprehensive Database</h3>
              <p className="card-content">Access detailed information about road projects, contracts, and contractors across India.</p>
            </div>
            <div className="card">
              <h3 className="card-title">✅ Verified Information</h3>
              <p className="card-content">All data is verified by our community and administrators to ensure accuracy.</p>
            </div>
            <div className="card">
              <h3 className="card-title">👥 Community Driven</h3>
              <p className="card-content">Citizens can report incidents, upload documents, and contribute to transparency.</p>
            </div>
            <div className="card">
              <h3 className="card-title">📈 Track Progress</h3>
              <p className="card-content">Monitor the progress of road projects with timelines and milestone updates.</p>
            </div>
            <div className="card">
              <h3 className="card-title">🔍 Search & Filter</h3>
              <p className="card-content">Easily search and filter roads by location, status, contractor, and other criteria.</p>
            </div>
            <div className="card">
              <h3 className="card-title">📱 Mobile Friendly</h3>
              <p className="card-content">Access the platform from any device with full responsive design support.</p>
            </div>
          </div>
        </section>

        <section style={{ paddingTop: '40px', borderTop: '1px solid #e5e7eb' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600', color: '#1f2937' }}>Get Started</h2>
          <div className="grid-2" style={{ gap: '30px' }}>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3 className="card-title">👀 Browse Roads</h3>
              <p className="card-content">Explore thousands of road projects and get detailed information about their status and progress.</p>
              <Link to="/roads" className="btn btn-primary" style={{ marginTop: '15px', display: 'inline-flex' }}>
                View Roads →
              </Link>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3 className="card-title">📤 Contribute</h3>
              <p className="card-content">Help us maintain accurate data by uploading documents related to road projects in your area.</p>
              <Link to="/upload" className="btn btn-primary" style={{ marginTop: '15px', display: 'inline-flex' }}>
                Upload Now →
              </Link>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3 className="card-title">🔍 Search</h3>
              <p className="card-content">Find specific roads, contractors, or documents with powerful search capabilities.</p>
              <Link to="/search" className="btn btn-primary" style={{ marginTop: '15px', display: 'inline-flex' }}>
                Start Searching →
              </Link>
            </div>
            <div className="card" style={{ textAlign: 'center' }}>
              <h3 className="card-title">👥 Find Contractors</h3>
              <p className="card-content">Discover contractors and their project history to make informed decisions.</p>
              <Link to="/contractors" className="btn btn-primary" style={{ marginTop: '15px', display: 'inline-flex' }}>
                View Contractors →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
