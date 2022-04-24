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

  const { characters, isLoading, errorMessage, limitOnPage, totalItems, currPage } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPage = Math.ceil((limitOnPage / 20) * currPage);

    const fetchChars = async (fetchPage: number) => {
      try {
        dispatch({ type: GET_CHARACTERS });

        const data = await rickMortyApi.getCharacters(fetchPage);
        let { results } = data;

        const {
          info: { count },
        } = data;

        const allowIdStart = limitOnPage * currPage - limitOnPage;
        const allowIdEnd = limitOnPage * currPage;

        results = [...results].filter((el) => {
          return el.id > allowIdStart && el.id <= allowIdEnd;
        });

        dispatch({ type: SET_CHARACTERS, characters: results, totalItems: count });
      } catch (e) {
        if (typeof e === 'string') {
        } else if (e instanceof Error) {
          dispatch({ type: SET_CHARACTERS_ERROR, message: e.message });
        }
      }
    };

    fetchChars(fetchPage);
  }, [currPage, limitOnPage]);

  console.log(characters);

  return (
    <div className="content">
      <SearchBar dispatch={dispatch} />

      {isLoading && <Preloader />}

      {errorMessage && <div className="error">`Ошибка: ${errorMessage}`</div>}

      <Selectors limitOnPage={limitOnPage} dispatch={dispatch} />

      <Characters characters={characters} />

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
