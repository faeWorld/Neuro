// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'; // Ensure this file exists in the same directory


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="dropdown">
          <button className="dropbtn">Other Tests</button>
          <div className="dropdown-content">
            <NavLink to="/games">Games</NavLink>
            <NavLink to="/character">Character Test</NavLink>
            <NavLink to="/knowledge">Knowledge Test</NavLink>
          </div>
        </div>
      </div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/knowledge"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            About Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
