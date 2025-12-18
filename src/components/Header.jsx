
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useBasket } from '../context/BasketContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { getBasketCount } = useBasket();
  const { user, logout } = useAuth();
  
  const handleLogoClick = (e) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    logout();
    alert('You have been logged out!');
  };

  return (
    <header className="Header">
      <Link to="/" className="Header-logo-link" onClick={handleLogoClick}>
        <div className="Header-logo">STRANGER THINGS</div>
      </Link>
      <nav className="Header-nav">
        <a href="/#about">ABOUT</a>
        <a href="/#seasons">SEASONS</a> 
        <a href="/#characters">CHARACTERS</a> 
        <a href="/#moments">GALLERY</a>
        <a href="/shop">SHOP</a>
        <Link to="/basket" className="basket-link">
          🛒 {getBasketCount() > 0 && `(${getBasketCount()})`}
        </Link>
        
        {/* Статус пользователя */}
        {user ? (
          <>
            <span className="user-greeting">
              👋 Hi, {user.username}!
            </span>
            <button onClick={handleLogout} className="logout-button">
              LOGOUT
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link">
              LOGIN
            </Link>
            <Link to="/register" className="auth-link register">
              SIGN UP
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;