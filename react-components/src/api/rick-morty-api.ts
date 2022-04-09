import { baseUrl } from './api';

export const rickMortyApi = {
  getCharacters() {
    return fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => data.results);
  },
  getCharacter(id: number) {
    return fetch(baseUrl + '/' + id)
      .then((response) => response.json())
      .then((data) => data.results);
  },
  searchCharactersByName(name: string) {
    return fetch(`${baseUrl}/?name=${name}`)
      .then((response) => response.json())
      .then((data) => data.results);
  },
};
