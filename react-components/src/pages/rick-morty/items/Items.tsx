import React from 'react';
import Item from '../item/Item';
import { character } from '../RickMorty';

interface IProps {
  characters: character[];
}

class Items extends React.Component<IProps> {
  render() {
    const { characters } = this.props;
    return (
      <div className="items">
        {characters?.map((el) => {
          return <Item key={el.id} {...el} />;
        })}
      </div>
    );
  }
}

export default Items;
