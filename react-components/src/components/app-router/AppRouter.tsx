import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutUs from '../../pages/about-us/AboutUs';
import Forms from '../../pages/forms/Forms';
import HomePage from '../../pages/home-page/HomePage';
import Page404 from '../../pages/page-404/Page404';

class AppRouter extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    );
  }
}

export default AppRouter;
