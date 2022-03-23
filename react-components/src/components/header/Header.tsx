import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import home from './assets/home.svg';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="header__content">
            <Link to="/">
              <img width={30} src={home} alt="home" />
            </Link>
            <Link to="/aboutus">About Us</Link>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
