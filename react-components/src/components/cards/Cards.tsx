import React from 'react';
import Card from '../card/Card';
import './Cards.css';
import { goods } from './data';

class Cards extends React.Component {
  render() {
    return (
      <div className="cards">
        {goods.map((el) => {
          return <Card key={el.id} {...el} />;
        })}
      </div>
    );
  }
}

export default Cards;
