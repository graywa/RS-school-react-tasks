import React, { FC, useEffect } from 'react';
import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './App.css';
import AppRouter from './components/app-router/AppRouter';
import Header from './components/header/Header';
import { store } from './store/redux-store';

const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="app">
      <Provider store={store}>
        <Header />
        <div className="container">
          <AppRouter />
        </div>
      </Provider>
    </div>
  );
};

export default App;
