import React from 'react';
import './SearchBar.css';
import search from './assets/search.svg';

class SearchBar extends React.Component {
  state = {
    searchValue: '',
  };

  componentWillUnmount() {
    localStorage.setItem('searchValue', this.state.searchValue);
  }

  componentDidMount() {
    this.setState({ searchValue: localStorage.getItem('searchValue') });
  }

  componentDidUpdate() {
    localStorage.setItem('searchValue', '');
  }

  render() {
    return (
      <div className="search">
        <img src={search} alt="search" />
        <input
          placeholder="search..."
          value={this.state.searchValue}
          onChange={(e) => this.setState({ searchValue: e.target.value })}
          data-testid="search-input"
        />
      </div>
    );
  }
}

export default SearchBar;
