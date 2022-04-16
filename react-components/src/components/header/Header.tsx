import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="header__content">
          <NavLink to="/">Rick and Morty</NavLink>
          <span className="links">
            <NavLink to="/cards">Cards</NavLink>
            <NavLink to="/forms">Forms</NavLink>
            <NavLink to="/about">About Us</NavLink>
          </span>
        </nav>
      </div>
    </header>
  );
}

export default Header;
