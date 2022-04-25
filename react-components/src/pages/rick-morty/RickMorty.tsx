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
  const { state, dispatch } = useContext(StateContext);

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
  } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPage = Math.ceil((limitOnPage / 20) * currPage);

    const fetchChars = async (fetchPage: number) => {
      try {
        dispatch({ type: GET_CHARACTERS });

        const data = await rickMortyApi.searchCharactersByFilter(fetchPage, searchValue, status);
        let { results } = data;

        const {
          info: { count },
        } = data;

        const allowIndEnd = (currPage - (fetchPage - 1) * (20 / limitOnPage)) * limitOnPage;
        const allowIndStart = allowIndEnd - limitOnPage;

        results = [...results].slice(allowIndStart, allowIndEnd);

        dispatch({ type: SET_CHARACTERS, characters: results, totalItems: count });
      } catch (e) {
        if (typeof e === 'string') {
        } else if (e instanceof Error) {
          dispatch({ type: SET_CHARACTERS_ERROR, message: e.message });
        }
      }
    };

    fetchChars(fetchPage);
  }, [currPage, limitOnPage, status]);

  return (
    <div className="content">
      <SearchBar
        status={status}
        searchValue={searchValue}
        limitOnPage={limitOnPage}
        dispatch={dispatch}
      />

      {isLoading && <Preloader />}

      {errorMessage && <div className="error">`Ошибка: ${errorMessage}`</div>}

      <Selectors
        limitOnPage={limitOnPage}
        status={status}
        sort={sort}
        currPage={currPage}
        dispatch={dispatch}
      />

      <Characters sort={sort} characters={characters} />

      <Paginator
        dispatch={dispatch}
        limitOnPage={limitOnPage}
        totalItems={totalItems}
        currPage={currPage}
      />
    </div>
  );
});

export default RickMorty;
