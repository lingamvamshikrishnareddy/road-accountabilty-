import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = ({ onSidebarToggle }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <button className="sidebar-toggle" onClick={onSidebarToggle} title="Toggle sidebar">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/" className="nav-logo">
          🛣️ Road Accountability
        </Link>
        <div className="nav-actions">
          {!user ? (
            <Link to="/auth" className="nav-btn nav-btn-primary">Sign In</Link>
          ) : (
            <button onClick={handleSignOut} className="nav-btn nav-btn-secondary">Sign Out</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
