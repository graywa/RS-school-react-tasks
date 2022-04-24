import React, { FC, useContext } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { StateContext } from '../../../../context/context';
import { character } from '../../RickMorty';
import arrowBack from '../../assets/arrow-back.svg';
import './DetailCharacter.scss';

const DetailCharacter: FC = () => {
  const { id } = useParams();

  const { state } = useContext(StateContext);
  const { characters } = state;

  const character: character | undefined = characters.find((el) => el.id === Number(id));

  if (!character) return <Navigate to="/" />;

  const { name, species, gender, status, image, type, location } = character;

  return (
    <div className="detail">
      <div className="detail__back">
        <Link to="/">
          Back
          <img width={30} src={arrowBack} alt="arr" />
        </Link>
      </div>

      <div className="detail__content">
        <div>
          <img width={380} src={image} alt="image" />
        </div>
        <div className="detail__desc">
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
          <div>
            <span>Status: </span>
            {status}
          </div>
          <div>
            <span>Location: </span>
            {location.name}
          </div>
          <div>
            <span>Type: </span>
            {type}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCharacter;
