import React from 'react';
import Cards from '../../components/cards/Cards';
import SearchBar from '../../components/search-bar/SearchBar';

import './HomePage.css';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <SearchBar />
        <Cards />
      </div>
    );
  }
}

export default HomePage;
