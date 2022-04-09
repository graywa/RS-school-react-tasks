import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <nav className="header__content">
            <NavLink to="/">Home</NavLink>
            <span className="links">
              <NavLink to="/rick-morty">Rick and Morty</NavLink>
              <NavLink to="/forms">Forms</NavLink>
              <NavLink to="/about">About Us</NavLink>
            </span>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
