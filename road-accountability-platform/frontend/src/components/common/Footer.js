import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Road Accountability</h4>
          <p>A citizen-driven platform to track road construction projects and promote transparency.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/roads">Roads</a></li>
            <li><a href="/upload">Upload</a></li>
            <li><a href="/search">Search</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@roadaccountability.in</p>
          <p>Phone: +91-XXXX-XXXX-XX</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2026 Road Accountability Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
