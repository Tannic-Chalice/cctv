import React from 'react';
import '../styles/globals.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo-section">
        <img src="/images/cctv.jpg" alt="Logo" className="logo" />
        <span className="site-name">CCTV</span>
      </div>
      <nav className="nav-links">
        <a href="/">Home</a>
        <a href="/Dashboard">Dashboard</a>
        <a href="/contact">Contact Us</a>
      </nav>
    </header>
  );
};

export default Header;
