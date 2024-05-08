import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../homepage-style.css';  

const NavigationBar = ({userName, handleSignOut }) => {
    const location = useLocation();
    const { pathname } = location;

    // Exclude login and signup pages from showing the navigation bar
    if (pathname === '/login' || pathname === '/signup') {
        return null;
    }

 

    return (
        
        <header className="navbar">
  <div className="logo">MyMusicApp</div>
  <div className="welcome">Welcome, <span>{userName}</span></div>
  <nav>
    <Link to="/playlists" className="nav-link">Playlists</Link>
    <button onClick={handleSignOut} className="logout-button">Log Out</button>
  </nav>
</header>

    );
};

export default NavigationBar;
