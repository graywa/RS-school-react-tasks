import React, { FC } from 'react';
import './SearchBar.css';
import search from './assets/search.svg';
import { rickMortyApi } from '../../api/rick-morty-api';
import {
  actionTypes,
  CHANGE_PAGE,
  GET_CHARACTERS,
  SET_CHARACTERS,
  SET_CHARACTERS_ERROR,
  SET_SEARCH_VALUE,
} from '../../store/store';

interface IProps {
  limitOnPage: number;
  searchValue: string;
  status: string;
  dispatch: React.Dispatch<actionTypes>;
}

const SearchBar: FC<IProps> = ({ searchValue, limitOnPage, status, dispatch }) => {
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      dispatch({ type: GET_CHARACTERS });

      const data = await rickMortyApi.searchCharactersByFilter(1, searchValue, status);

      let { results } = data;

      const {
        info: { count },
      } = data;

      const allowIndStart = 0;
      const allowIndEnd = limitOnPage;

      results = [...results].slice(allowIndStart, allowIndEnd);

      dispatch({ type: SET_CHARACTERS, characters: results, totalItems: count });
      dispatch({ type: CHANGE_PAGE, currPage: 1 });
    } catch (e) {
      if (typeof e === 'string') {
        e.toUpperCase();
      } else if (e instanceof Error) {
        dispatch({ type: SET_CHARACTERS_ERROR, message: e.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search">
        <img src={search} alt="search" onClick={handleSubmit} />
        <input
          placeholder="search..."
          value={searchValue}
          onChange={(e) => dispatch({ type: SET_SEARCH_VALUE, searchValue: e.target.value })}
          data-testid="search-input"
        />
      </div>
    </form>
  );
};

export default SearchBar;
