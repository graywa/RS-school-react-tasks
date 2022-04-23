import { actionTypes, initialState, initialStateType } from './../store/store';
import { createContext } from 'react';

export const StateContext = createContext<{
  state: initialStateType;
  dispatch: React.Dispatch<actionTypes>;
}>({
  state: initialState,
  dispatch: () => null,
});
