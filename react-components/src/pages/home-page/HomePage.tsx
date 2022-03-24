import React from 'react';
import Card from '../../components/card/Card';
import SearchBar from '../../components/search-bar/SearchBar';
import { goods } from './data';
import './HomePage.css';

class HomePage extends React.Component {
  render() {
    return (
      <div className="home-page">
        <SearchBar />
        <div className="cards">
          {goods.map((el) => {
            return <Card key={el.code} {...el} />;
          })}
        </div>
      </div>
    );
  }
}

export default HomePage;
