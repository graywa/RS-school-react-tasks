import React, { FC, useEffect, useState } from 'react';
import './SearchBar.css';
import search from './assets/search.svg';
import { rickMortyApi } from '../../api/rick-morty-api';
import { character } from '../../pages/rick-morty/RickMorty';
import {
  actionTypes,
  RESET_CHARACTERS,
  SET_CHARACTERS,
  SET_CHARACTERS_ERROR,
} from '../../store/store';

interface IProps {
  dispatch: React.Dispatch<actionTypes>;
}

const SearchBar: FC<IProps> = ({ dispatch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      dispatch({ type: RESET_CHARACTERS });
      const characters = await rickMortyApi.searchCharactersByName(searchValue);
      dispatch({ type: SET_CHARACTERS, characters });
    } catch (e) {
      if (typeof e === 'string') {
        e.toUpperCase();
      } else if (e instanceof Error) {
        dispatch({ type: SET_CHARACTERS_ERROR, message: e.message });
      }
    }
  };

  useEffect(() => {
    if (searchValue) {
      localStorage.setItem('searchValue', searchValue);
    }
  }, [searchValue]);

  useEffect(() => {
    const value = localStorage.getItem('searchValue');
    if (value) {
      setSearchValue(value);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="search">
        <img src={search} alt="search" onClick={handleSubmit} />
        <input
          placeholder="search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          data-testid="search-input"
        />
      </div>
    </form>
  );
};

export default SearchBar;
