// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css'; // Ensure this file exists in the same directory
import logo from '../components/peela.png';


function Navbar() {
  return (
    <nav className="navbar">
  <div className="navbar-logo">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="logo" />
        </NavLink>
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
            Quiz
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
