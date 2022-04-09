import React from 'react';
import { rickMortyApi } from '../../api/rick-morty-api';
import Preloader from '../../components/preloader/Preloader';
import SearchBar from '../../components/search-bar/SearchBar';
import Items from './items/Items';
import './RickMorty.scss';

export type character = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
};

class RickMorty extends React.Component {
  state = {
    isLoading: false,
    characters: [] as character[],
  };

  getChars = () => {
    this.setState({ characters: [], isLoading: true });
  };

  setChars = (chars: character[]) => {
    this.setState({ characters: chars, isLoading: false });
  };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      setTimeout(() => {
        rickMortyApi.getCharacters().then((characters) => {
          this.setState({ characters: characters, isLoading: false });
        });
      }, 1000);
    } catch (e) {
      if (typeof e === 'string') {
        console.log(e.toUpperCase());
      } else if (e instanceof Error) {
        console.log(e.message);
      }
    }
  }

  render() {
    const isLoading = this.state.isLoading;

    return (
      <div className="content">
        <SearchBar getChars={this.getChars} setChars={this.setChars} />
        {isLoading && <Preloader />}
        <Items characters={this.state.characters} />
      </div>
    );
  }
}

export default RickMorty;
