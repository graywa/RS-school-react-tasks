import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import AboutUs from './pages/about-us/AboutUs';
import Forms from './pages/forms/Forms';
import HomePage from './pages/home-page/HomePage';
import Page404 from './pages/page-404/Page404';

class App extends React.Component {
  componentDidMount() {
    localStorage.setItem('searchValue', '');
  }

  render() {
    console.log('render app');
    return (
      <div className="app">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
