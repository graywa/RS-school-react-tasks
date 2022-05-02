import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  id: number;
  name: string;
  species: string;
  gender: string;
  image: string;
}

const Character: FC<IProps> = ({ id, name, species, gender, image }: IProps) => {
  return (
    <>
      <Link className="item" to={`/${id}`} data-testid="character">
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
