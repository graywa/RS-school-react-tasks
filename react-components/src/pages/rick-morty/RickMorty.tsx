import React, { FC, useEffect } from 'react';
import Preloader from '../../components/preloader/Preloader';
import SearchBar from '../../components/search-bar/SearchBar';
import Characters from './characters/Characters';
import './RickMorty.scss';
import Paginator from '../../components/paginator/Paginator';
import Selectors from '../../components/selectors/Selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getCharactersByFilter } from '../../store/AsyncActionCreators';

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

const RickMorty: FC = React.memo(() => {
  const dispatch = useAppDispatch();

  const {
    characters,
    searchValue,
    isLoading,
    errorMessage,
    limitOnPage,
    status,
    sort,
    totalItems,
    currPage,
  } = useAppSelector((state) => state.characters);

  useEffect(() => {
    if (!characters.length && !errorMessage)
      dispatch(getCharactersByFilter({ fetchPage: 1, searchValue: '', status: '' }));
  }, []);

  return (
    <div className="content">
      <SearchBar status={status} searchValue={searchValue} />

      <Selectors searchValue={searchValue} limitOnPage={limitOnPage} status={status} sort={sort} />

      {isLoading && <Preloader />}

      <Characters sort={sort} characters={characters} />

      {errorMessage && <div className="error">Ошибка: {errorMessage}</div>}

      {!!totalItems && (
        <Paginator limitOnPage={limitOnPage} totalItems={totalItems} currPage={currPage} />
      )}
    </div>
  );
});

export default RickMorty;
