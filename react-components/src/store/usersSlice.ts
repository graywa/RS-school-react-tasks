import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../pages/forms/Forms';

interface usersState {
  users: IUser[];
  userName: string;
  date: string;
  city: string;
  sex: string;
  photo: string;
  check: boolean;
}

const initialState: usersState = {
  users: [],
  userName: '',
  date: '',
  city: '',
  sex: '',
  photo: '',
  check: false,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser(state, { payload }) {
      state.users.push(payload);
    },
    saveFiedsForm(state, { payload: { name, date, city, sex, check } }) {
      state.userName = name;
      state.date = date;
      state.city = city;
      state.sex = sex;
      state.check = check;
    },
  },
});

export const { addUser, saveFiedsForm } = usersSlice.actions;

export default usersSlice.reducer;
