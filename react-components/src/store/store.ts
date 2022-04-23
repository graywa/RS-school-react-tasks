import { character } from './../pages/rick-morty/RickMorty';
import { IUser } from './../pages/forms/Forms';

export const ADD_USER = 'ADD_USER';
export const GET_CHARACTERS = 'GET_CHARACTERS';
export const SET_CHARACTERS = 'SET_CHARACTERS';
export const RESET_CHARACTERS = 'RESET_CHARACTERS';
export const SET_CHARACTERS_ERROR = 'SET_CHARACTERS_ERROR';

export const initialState = {
  characters: [] as character[],
  isLoading: false,
  errorMessage: '',
  users: [] as IUser[],
};

export type initialStateType = typeof initialState;

type addUserAction = {
  type: typeof ADD_USER;
  user: IUser;
};

type getCharactersAction = {
  type: typeof GET_CHARACTERS;
};

type setCharactersAction = {
  type: typeof SET_CHARACTERS;
  characters: character[];
};

type resetCharactersAction = {
  type: typeof RESET_CHARACTERS;
};

type setCharactersErrorAction = {
  type: typeof SET_CHARACTERS_ERROR;
  message: string;
};

export type actionTypes =
  | addUserAction
  | getCharactersAction
  | setCharactersAction
  | resetCharactersAction
  | setCharactersErrorAction;

export function reducer(state: initialStateType, action: actionTypes): initialStateType {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.user] };
    case GET_CHARACTERS:
      return { ...state, isLoading: true, errorMessage: '' };
    case SET_CHARACTERS:
      return { ...state, characters: [...action.characters], isLoading: false };
    case RESET_CHARACTERS:
      return { ...state, characters: [], isLoading: true, errorMessage: '' };
    case SET_CHARACTERS_ERROR:
      return { ...state, errorMessage: action.message, isLoading: false };
    default:
      return state;
  }
}
