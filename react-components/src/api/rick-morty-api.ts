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
  async searchCharactersByFilter(page = 1, name: string, status: string) {
    const response = await axios.get(baseUrl, {
      params: {
        page,
        name,
        status,
      },
    });
    return response.data;
  },
};

export default rickMortyApi;
