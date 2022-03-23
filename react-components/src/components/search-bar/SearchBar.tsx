import React from 'react';
import './SearchBar.css';
import search from './assets/search.svg';

class SearchBar extends React.Component {
  render() {
    return (
      <div className="search">
        <img src={search} alt="search" />
        <input placeholder="search.." />
      </div>
    );
  }
}

export default SearchBar;
