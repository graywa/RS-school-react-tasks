import { getFetchPage } from './../helpers/helpers';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { character } from '../pages/rick-morty/RickMorty';
import { getCharactersByFilter } from './AsyncActionCreators';

interface charactersState {
  searchValue: string;
  characters: character[];
  isLoading: boolean;
  errorMessage: string;
  totalItems: number;
  currPage: number;
  limitOnPage: number;
  status: string;
  sort: 'name' | 'gender' | 'status' | 'species' | '';
}

const initialState: charactersState = {
  searchValue: '',
  characters: [],
  isLoading: false,
  errorMessage: '',
  totalItems: 0,
  currPage: 1,
  limitOnPage: 20,
  status: '',
  sort: '' as 'name' | 'gender' | 'status' | 'species' | '',
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    changeCurrPage(state, action) {
      state.currPage = action.payload;
    },
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    changeLimitOnPage(state, { payload }) {
      state.limitOnPage = payload;
    },
    changeStatus(state, { payload }) {
      state.status = payload;
    },
    changeSort(state, { payload }) {
      state.sort = payload;
    },
  },
  extraReducers: {
    [getCharactersByFilter.fulfilled.type]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.errorMessage = '';
      const { currPage, limitOnPage } = state;
      const { results, info } = action.payload;
      const fetchPage = getFetchPage(limitOnPage, currPage);

      const allowIndEnd = (currPage - (fetchPage - 1) * (20 / limitOnPage)) * limitOnPage;
      const allowIndStart = allowIndEnd - limitOnPage;

      state.characters = [...results].slice(allowIndStart, allowIndEnd);
      state.totalItems = info.count;
    },
    [getCharactersByFilter.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getCharactersByFilter.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
  },
});

export const { changeCurrPage, setSearchValue, changeLimitOnPage, changeStatus, changeSort } =
  charactersSlice.actions;

export default charactersSlice.reducer;
