import React, { FC, useContext, useEffect, useState } from 'react';
import { rickMortyApi } from '../../api/rick-morty-api';
import Preloader from '../../components/preloader/Preloader';
import SearchBar from '../../components/search-bar/SearchBar';
import { StateContext } from '../../context/context';
import Items from './characters/Characters';
import './RickMorty.scss';
import { SET_CHARACTERS, SET_CHARACTERS_ERROR } from '../../store/store';

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

const RickMorty: FC = () => {
  const { state, dispatch } = useContext(StateContext);

  const { characters, isLoading, errorMessage } = state;

  useEffect(() => {
    const fetchChars = async () => {
      try {
        const data = await rickMortyApi.getCharacters();
        dispatch({ type: SET_CHARACTERS, characters: data });
      } catch (e) {
        if (typeof e === 'string') {
        } else if (e instanceof Error) {
          dispatch({ type: SET_CHARACTERS_ERROR, message: e.message });
        }
      }
    };
    fetchChars();
  }, []);

  console.log(characters);

  return (
    <div className="content">
      <SearchBar dispatch={dispatch} />

      {isLoading && <Preloader />}
      {errorMessage && <div className="error">`Ошибка: ${errorMessage}`</div>}
      <Items characters={characters} />
    </div>
  );
};

export default RickMorty;
