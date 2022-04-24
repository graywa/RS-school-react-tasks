import axios from 'axios';
import { baseUrl } from './api';

export const rickMortyApi = {
  async getCharacters(page = 1) {
    const response = await axios.get(baseUrl, {
      params: {
        page,
      },
    });
    return response.data;
  },
  async getCharacter(id: number) {
    const response = await axios.get(baseUrl + '/' + id);
    return response.data.results;
  },
  async searchCharactersByName(name: string) {
    const response = await axios.get(baseUrl, {
      params: {
        name,
      },
    });
    return response.data;
  },
};

export default rickMortyApi;
