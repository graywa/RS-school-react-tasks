import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutUs from '../../pages/about-us/AboutUs';
import Forms from '../../pages/forms/Forms';
import StaticCards from '../../pages/static-cards/StaticCards';
import Page404 from '../../pages/page-404/Page404';
import RickMorty from '../../pages/rick-morty/RickMorty';
import DetailCharacter from '../../pages/rick-morty/characters/detail-character/DetailCharacter';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<RickMorty />} />
      <Route path="/:id" element={<DetailCharacter />} />
      <Route path="/cards" element={<StaticCards />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

export default AppRouter;
