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
  location: {
    name: string;
  };
};

class RickMorty extends React.Component {
  state = {
    isLoading: false,
    errorMessage: '',
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
      const data = await rickMortyApi.getCharacters();
      this.setState({ characters: data, isLoading: false, errorMessage: '' });
    } catch (e) {
      console.log(e);
      if (typeof e === 'string') {
      } else if (e instanceof Error) {
        this.setState({ errorMessage: e.message, isLoading: false });
      }
    }
  }

  render() {
    const { isLoading, errorMessage } = this.state;

    return (
      <div className="content">
        <SearchBar getChars={this.getChars} setChars={this.setChars} />
        {isLoading && <Preloader />}
        {errorMessage && <div className="error">`Ошибка: ${errorMessage}`</div>}
        <Items characters={this.state.characters} />
      </div>
    );
  }
}

export default RickMorty;
