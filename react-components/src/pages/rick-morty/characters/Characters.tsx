import React, { FC, useContext } from 'react';
import { StateContext } from '../../../context/context';
import Character from '../character/Character';
import { character } from '../RickMorty';

interface IProps {
  characters: character[];
}

const Characters: FC<IProps> = ({ characters }) => {
  return (
    <div className="items">
      {characters?.map((el) => {
        return <Character key={el.id} {...el} />;
      })}
    </div>
  );
};

export default Characters;
