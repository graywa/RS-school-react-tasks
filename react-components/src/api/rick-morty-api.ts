import axios from 'axios';
import { baseUrl } from './api';

export const rickMortyApi = {
  async getCharacters() {
    const response = await axios.get(baseUrl);
    return response.data.results;
  },
  async getCharacter(id: number) {
    const response = await axios.get(baseUrl + '/' + id);
    return response.data.results;
  },
  async searchCharactersByName(name: string) {
    const response = await axios.get(`${baseUrl}/?name=${name}`);
    return response.data.results;
  },
};

export default rickMortyApi;
