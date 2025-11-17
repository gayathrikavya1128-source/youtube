// components/Header.js
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, user, onLogout }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to home with search query
      navigate(`/?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <span className="logo-red">You</span>Tube
        </Link>
      </div>

      {isLoggedIn && (
        <div className="header-center">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <span className="search-icon">🔍</span>
            </button>
          </form>
        </div>
      )}

      <div className="header-right">
        {isLoggedIn ? (
          <div className="user-section">
            <span className="welcome-text">
              Hi <span className="username">{user?.username}</span>!
            </span>
            <nav className="nav-links">
              <Link to="/" className={`nav-link ${isActive('/')}`}>
                🏠 Home
              </Link>
              <Link to="/shorts" className={`nav-link ${isActive('/shorts')}`}>
                🎬 Shorts
              </Link>
              <Link to="/subscriptions" className={`nav-link ${isActive('/subscriptions')}`}>
                📋 Subscriptions
              </Link>
              <Link to="/history" className={`nav-link ${isActive('/history')}`}>
                📚 History
              </Link>
            </nav>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;