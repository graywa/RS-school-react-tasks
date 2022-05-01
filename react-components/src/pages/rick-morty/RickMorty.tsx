import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { rickMortyApi } from '../../api/rick-morty-api';
import Preloader from '../../components/preloader/Preloader';
import SearchBar from '../../components/search-bar/SearchBar';
import { StateContext } from '../../context/context';
import Characters from './characters/Characters';
import './RickMorty.scss';
import { GET_CHARACTERS, SET_CHARACTERS, SET_CHARACTERS_ERROR } from '../../store/store';
import Paginator from '../../components/paginator/Paginator';
import Selectors from '../../components/selectors/Selectors';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getCharactersByFilter } from '../../store/AsyncActionCreators';
import { useNavigate } from 'react-router-dom';
import { getFetchPage } from '../../helpers/helpers';

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
    if (!characters.length)
      dispatch(getCharactersByFilter({ fetchPage: 1, searchValue: '', status: '' }));
  }, []);

  return (
    <div className="content">
      <SearchBar status={status} searchValue={searchValue} />

      {isLoading && <Preloader />}

      <Selectors searchValue={searchValue} limitOnPage={limitOnPage} status={status} sort={sort} />

      <Characters sort={sort} characters={characters} />

      {errorMessage && <div className="error">Ошибка: {errorMessage}</div>}

      <Paginator limitOnPage={limitOnPage} totalItems={totalItems} currPage={currPage} />
    </div>
  );
});

export default RickMorty;
