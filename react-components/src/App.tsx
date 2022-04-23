import React, { FC, useReducer } from 'react';
import './App.css';
import AppRouter from './components/app-router/AppRouter';
import Header from './components/header/Header';
import { StateContext } from './context/context';
import { initialState, reducer } from './store/store';

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <StateContext.Provider value={{ state, dispatch }}>
        <Header />
        <div className="container">
          <AppRouter />
        </div>
      </StateContext.Provider>
    </div>
  );
};

export default App;
