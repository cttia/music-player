import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../homepage-style.css";

const HomePage = ({ username, onSignOut }) => {
  console.log("HomePage entry:" + username);

  return (
    <div className="home-page">
      <div className="search-bar">
        <input type="text" placeholder="Search music, artists, albums..." />
      </div>
      <section className="featured-content">
        <h2>Featured Playlists</h2>
        {/* Placeholder for featured playlists */}
      </section>
      <section className="recommendations">
        <h2>Recommended for You</h2>
        {/* Placeholder for recommended tracks */}
      </section>
      <section className="recently-played">
        <h2>Recently Played</h2>
        {/* Placeholder for recently played tracks */}
      </section>
      <footer className="music-player">
        {/* Placeholder for music player controls */}
      </footer>
    </div>
  );
};

export default HomePage;
