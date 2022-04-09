import React from 'react';
import './SearchBar.css';
import search from './assets/search.svg';
import { rickMortyApi } from '../../api/rick-morty-api';
import { character } from '../../pages/rick-morty/RickMorty';

interface IProps {
  getChars: () => void;
  setChars: (chars: character[]) => void;
}

class SearchBar extends React.Component<IProps> {
  state = {
    searchValue: '',
  };

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { getChars, setChars } = this.props;
    const name = this.state.searchValue;
    try {
      getChars();
      setTimeout(() => {
        rickMortyApi.searchCharactersByName(name).then((characters) => setChars(characters));
      }, 1000);
    } catch (e) {
      if (typeof e === 'string') {
        e.toUpperCase();
      } else if (e instanceof Error) {
        e.message;
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search">
          <img src={search} alt="search" onClick={this.handleSubmit} />
          <input
            placeholder="search..."
            value={this.state.searchValue}
            onChange={(e) => this.setState({ searchValue: e.target.value })}
            data-testid="search-input"
          />
        </div>
      </form>
    );
  }
}

export default SearchBar;
