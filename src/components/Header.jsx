import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="Header">
      <Link to="/" className="Header-logo-link" onClick={handleLogoClick}>
        <div className="Header-logo">STRANGER THINGS</div>
      </Link>
      <nav className="Header-nav">
        <a href="/#plot">THE PLOT</a>
        <a href="/#seasons">SEASONS</a> 
        <a href="/#characters">MAIN CHARACTERS</a> 
        <a href="/#moments">PHOTO GALLERY</a> 
        <a href="/#quotes">QUOTES</a> 
      </nav>
    </header>
  );
};

export default Header;