import React from 'react';
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

class Item extends React.Component<IProps> {
  state = {
    isModalOpen: false,
  };

  render() {
    const { name, species, gender, status, image, type, location } = this.props;
    return (
      <>
        <div className="item" onClick={() => this.setState({ isModalOpen: true })}>
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
          className={this.state.isModalOpen ? 'item-modal open' : 'item-modal'}
          onClick={() => this.setState({ isModalOpen: false })}
        >
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <div className="modal__cross" onClick={() => this.setState({ isModalOpen: false })}>
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
  }
}

export default Item;
