import { character } from './../pages/rick-morty/RickMorty';
import { IUser } from './../pages/forms/Forms';

export const ADD_USER = 'ADD_USER';
export const ADD_FORM_INFO = 'ADD_FORM_INFO';
export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const GET_CHARACTERS = 'GET_CHARACTERS';
export const SET_CHARACTERS = 'SET_CHARACTERS';
export const RESET_CHARACTERS = 'RESET_CHARACTERS';
export const SET_CHARACTERS_ERROR = 'SET_CHARACTERS_ERROR';
export const CHANGE_PAGE = 'CHANGE_PAGE';
export const CHANGE_LIMIT_ON_PAGE = 'CHANGE_LIMIT_ON_PAGE';
export const CHANGE_STATUS = 'CHANGE_STATUS';
export const CHANGE_SORT = 'CHANGE_SORT';
export const SET_LOCAL_CHARACTERS = 'SET_LOCAL_CHARACTERS';

export const initialState = {
  searchValue: '',
  characters: [] as character[],
  isLoading: false,
  errorMessage: '',
  totalItems: 0,
  currPage: 1,
  limitOnPage: 20,
  status: '',
  sort: '' as 'name' | 'gender' | 'status' | 'species' | '',
  users: [] as IUser[],
  userName: '',
  date: '',
  city: '',
  sex: '',
  photo: '',
};

export type initialStateType = typeof initialState;

type addUserAction = {
  type: typeof ADD_USER;
  user: IUser;
};
type addFormInfoAction = {
  type: typeof ADD_FORM_INFO;
  userName: string;
  date: string;
  city: string;
  sex: string;
  photo: string;
};
type setSearchValueAction = {
  type: typeof SET_SEARCH_VALUE;
  searchValue: string;
};
type getCharactersAction = {
  type: typeof GET_CHARACTERS;
};
type setCharactersAction = {
  type: typeof SET_CHARACTERS;
  characters: character[];
  totalItems: number;
};
type setLocalCharactersAction = {
  type: typeof SET_LOCAL_CHARACTERS;
  characters: character[];
};
type resetCharactersAction = {
  type: typeof RESET_CHARACTERS;
};
type setCharactersErrorAction = {
  type: typeof SET_CHARACTERS_ERROR;
  message: string;
};
type changePageAction = {
  type: typeof CHANGE_PAGE;
  currPage: number;
};
type changeLimitOnPageAction = {
  type: typeof CHANGE_LIMIT_ON_PAGE;
  limitOnPage: number;
  currPage: number;
};
type changeStatusAction = {
  type: typeof CHANGE_STATUS;
  status: string;
};
type changeSortAction = {
  type: typeof CHANGE_SORT;
  sort: 'name' | 'gender' | 'status' | 'species' | '';
};

export type actionTypes =
  | addUserAction
  | addFormInfoAction
  | getCharactersAction
  | setCharactersAction
  | resetCharactersAction
  | setCharactersErrorAction
  | changePageAction
  | changeLimitOnPageAction
  | setSearchValueAction
  | changeStatusAction
  | changeSortAction
  | setLocalCharactersAction;

export function reducer(state: initialStateType, action: actionTypes): initialStateType {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.user] };
    case ADD_FORM_INFO:
      const { userName, date, city, sex, photo } = action;
      return { ...state, userName, date, city, sex, photo };
    case GET_CHARACTERS:
      return { ...state, isLoading: true, errorMessage: '' };
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.searchValue };
    case SET_CHARACTERS:
      const { characters, totalItems } = action;
      return {
        ...state,
        characters: [...characters],
        isLoading: false,
        totalItems,
      };
    case SET_LOCAL_CHARACTERS:
      return { ...state, characters: action.characters };
    case RESET_CHARACTERS:
      return { ...state, characters: [], isLoading: true, errorMessage: '' };
    case SET_CHARACTERS_ERROR:
      return { ...state, errorMessage: action.message, isLoading: false };
    case CHANGE_PAGE:
      return { ...state, currPage: action.currPage };
    case CHANGE_LIMIT_ON_PAGE:
      const { currPage, limitOnPage } = action;
      return { ...state, limitOnPage, currPage };
    case CHANGE_STATUS:
      return { ...state, status: action.status };
    case CHANGE_SORT:
      return { ...state, sort: action.sort };
    default:
      return state;
  }
}
