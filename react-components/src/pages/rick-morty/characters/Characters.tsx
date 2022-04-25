import React, { FC } from 'react';
import Character from '../character/Character';
import { character } from '../RickMorty';

interface IProps {
  characters: character[];
  sort: 'name' | 'gender' | 'status' | 'species' | '';
}

const Characters: FC<IProps> = ({ characters, sort }) => {
  if (sort) {
    characters = [...characters].sort((a, b) => a[sort].localeCompare(b[sort]));
  }
  return (
    <div className="items">
      {characters?.map((el) => {
        return <Character key={el.id} {...el} />;
      })}
    </div>
  );
};

export default Characters;
