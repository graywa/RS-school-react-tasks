import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import AboutUs from './pages/about-us/AboutUs';
import HomePage from './pages/home-page/HomePage';
import Page404 from './pages/page-404/page404';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="aboutus" element={<AboutUs />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
