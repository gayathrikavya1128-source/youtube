import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Shorts from './components/Shorts';
import Subscriptions from './components/Subscriptions';
import History from './components/History';
import Login from './components/Login';
import VideoDetail from './components/VideoDetail';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userData = JSON.parse(localStorage.getItem('user'));
    
    if (loggedIn && userData) {
      setIsLoggedIn(true);
      setUser(userData);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email && password) {
      const username = email.split('@')[0];
      const userData = { username, email };
      
      setUser(userData);
      setIsLoggedIn(true);
      
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="App">
        <Header 
          isLoggedIn={isLoggedIn} 
          user={user} 
          onLogout={handleLogout} 
        />
        
        <main className="main-content">
          <Routes>
            <Route 
              path="/login" 
              element={
                !isLoggedIn ? 
                <Login onLogin={handleLogin} /> : 
                <Navigate to="/" replace />
              } 
            />
            <Route 
              path="/" 
              element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/shorts" 
              element={isLoggedIn ? <Shorts /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/subscriptions" 
              element={isLoggedIn ? <Subscriptions /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/history" 
              element={isLoggedIn ? <History /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/video/:id" 
              element={isLoggedIn ? <VideoDetail /> : <Navigate to="/login" replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;