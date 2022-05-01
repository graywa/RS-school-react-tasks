import React, { FC } from 'react';
import './SearchBar.css';
import search from './assets/search.svg';
import { changeCurrPage, setSearchValue } from '../../store/charactersSlice';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { getCharactersByFilter } from '../../store/AsyncActionCreators';

interface IProps {
  searchValue: string;
  status: string;
}

const SearchBar: FC<IProps> = ({ searchValue, status }) => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    dispatch(getCharactersByFilter({ fetchPage: 1, searchValue, status }));
    dispatch(changeCurrPage(1));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="search">
        <img src={search} alt="search" onClick={handleSubmit} />
        <input
          placeholder="search..."
          value={searchValue}
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          data-testid="search-input"
        />
      </div>
    </form>
  );
};

export default SearchBar;
