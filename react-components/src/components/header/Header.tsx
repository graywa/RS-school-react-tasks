import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import './Header.scss';

const Header: FC = () => {
  const { pathname } = useLocation();
  let currLocation = '';
  let idChar = 0;

  const { characters } = useAppSelector((state) => state.characters);

  switch (pathname) {
    case '/':
      currLocation = 'Rick and Morty';
      break;
    case '/cards':
      currLocation = 'Cards';
      break;
    case '/about':
      currLocation = 'About Us';
      break;
    case '/forms':
      currLocation = 'Forms';
      break;
    default:
      currLocation = '404';
  }

  if (isFinite(Number(pathname.slice(1))) && pathname.slice(1) !== '') {
    idChar = Number(pathname.slice(1));
    const char = characters.find((el) => el.id === idChar);
    currLocation = `Rick and Morty / ${char?.name}`;
  }

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
        <div className="header__location">
          {`Вы находитесь на странице: `}
          <span>{currLocation}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
