import React from 'react';
import './App.css';
import AppRouter from './components/app-router/AppRouter';
import Header from './components/header/Header';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="container">
          <AppRouter />
        </div>
      </div>
    );
  }
}

export default App;
