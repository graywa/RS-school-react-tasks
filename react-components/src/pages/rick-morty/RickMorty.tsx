import React, { useEffect, useState } from 'react';
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

function RickMorty() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [characters, setCharacters] = useState([] as character[]);

  const getChars = () => {
    setCharacters([]);
  };

  const setChars = (chars: character[]) => {
    setCharacters(chars);
  };

  useEffect(() => {
    const fetchChars = async () => {
      try {
        setIsLoading(true);
        const data = await rickMortyApi.getCharacters();
        setCharacters(data);
        setIsLoading(false);
        setErrorMessage('');
      } catch (e) {
        console.log(e);
        if (typeof e === 'string') {
        } else if (e instanceof Error) {
          setIsLoading(false);
          setErrorMessage(e.message);
        }
      }
    };
    fetchChars();
  }, []);

  return (
    <div className="content">
      <SearchBar getChars={getChars} setChars={setChars} />
      {isLoading && <Preloader />}
      {errorMessage && <div className="error">`Ошибка: ${errorMessage}`</div>}
      <Items characters={characters} />
    </div>
  );
}

export default RickMorty;
