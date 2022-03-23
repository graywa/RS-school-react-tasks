import React from 'react';
import SearchBar from '../../components/search-bar/SearchBar';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <h2>home page</h2>
        <SearchBar />
      </div>
    );
  }
}

export default HomePage;
