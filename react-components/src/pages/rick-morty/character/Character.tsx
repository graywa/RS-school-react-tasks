import React, { useState } from 'react';
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

const Character = ({ name, species, gender, status, image, type, location }: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="item" onClick={() => setIsModalOpen(true)}>
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
      </div>

      <div
        className={isModalOpen ? 'item-modal open' : 'item-modal'}
        onClick={() => setIsModalOpen(false)}
      >
        <div className="modal__content" onClick={(e) => e.stopPropagation()}>
          <div className="modal__cross" onClick={() => setIsModalOpen(false)}>
            <img width={40} src={cross} alt="cross" />
          </div>
          <div>
            <img width={380} src={image} alt="image" />
          </div>
          <div className="modal__desc">
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
    </>
  );
};

export default Character;
