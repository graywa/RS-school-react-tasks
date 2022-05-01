import { rickMortyApi } from './../api/rick-morty-api';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IData {
  fetchPage: number;
  searchValue: string;
  status: string;
}

export const getCharactersByFilter = createAsyncThunk(
  'characters/getCharacters',
  async (data: IData, thunkAPI) => {
    try {
      const { fetchPage, searchValue, status } = data;
      const response = await rickMortyApi.searchCharactersByFilter(fetchPage, searchValue, status);
      return response;
    } catch (e) {
      if (e instanceof Error) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
