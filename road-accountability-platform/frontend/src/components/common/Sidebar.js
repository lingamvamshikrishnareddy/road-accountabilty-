import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      label: 'Home',
      path: '/',
      icon: '🏠',
      requiresAuth: false,
    },
    {
      label: 'Roads',
      path: '/roads',
      icon: '🛣️',
      requiresAuth: false,
    },
    {
      label: 'Contractors',
      path: '/contractors',
      icon: '👥',
      requiresAuth: false,
    },
    {
      label: 'Search',
      path: '/search',
      icon: '🔍',
      requiresAuth: false,
    },
    {
      label: 'Upload Document',
      path: '/upload',
      icon: '📄',
      requiresAuth: true,
    },
  ];

  const adminItems = [
    {
      label: 'Admin Dashboard',
      path: '/admin',
      icon: '📊',
      requiresAuth: true,
    },
  ];

  const visibleMenuItems = menuItems.filter(item => !item.requiresAuth || user);
  const visibleAdminItems = adminItems.filter(item => !item.requiresAuth || user);

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Menu</h2>
          <button className="sidebar-close" onClick={toggleSidebar}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <ul className="nav-list">
              {visibleMenuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                    onClick={toggleSidebar}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {visibleAdminItems.length > 0 && (
            <div className="nav-section">
              <h3 className="nav-section-title">Admin</h3>
              <ul className="nav-list">
                {visibleAdminItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                      onClick={toggleSidebar}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        <div className="sidebar-footer">
          <div className="divider"></div>
          {user ? (
            <div className="user-info">
              <div className="user-avatar">
                {user.email ? user.email.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="user-details">
                <p className="user-name">{user.email?.split('@')[0]}</p>
                <p className="user-email">{user.email}</p>
              </div>
            </div>
          ) : (
            <Link to="/auth" className="sidebar-auth-btn" onClick={toggleSidebar}>
              Sign In
            </Link>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
