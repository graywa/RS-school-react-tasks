import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../pages/forms/Forms';

interface usersState {
  users: IUser[];
  userName: string;
  date: string;
  city: string;
  sex: string;
  photo: string;
}

const initialState: usersState = {
  users: [],
  userName: '',
  date: '',
  city: '',
  sex: '',
  photo: '',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, { payload }) {
      state.users.push(payload);
    },
  },
});

export const { addUser } = usersSlice.actions;

export default usersSlice.reducer;
