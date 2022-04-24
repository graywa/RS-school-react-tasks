import React, { FC, useEffect, useReducer } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './components/app-router/AppRouter';
import Header from './components/header/Header';
import { StateContext } from './context/context';
import { initialState, reducer } from './store/store';

const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
