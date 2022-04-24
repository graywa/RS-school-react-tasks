import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import cross from '../assets/cross.svg';

interface IProps {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
}

const Character: FC<IProps> = ({
  id,
  name,
  species,
  gender,
  status,
  image,
  type,
  location,
}: IProps) => {
  return (
    <>
      <Link className="item" to={`/${id}`}>
        <div>
          <img width={250} src={image} alt="image" />
        </div>
        <div className="item__desc">
          <div>
            <span>Name: </span>
            {name}
          </div>
          <div>
            <span>Specias: </span>
            {species}
          </div>
          <div>
            <span>Gender: </span>
            {gender}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Character;
