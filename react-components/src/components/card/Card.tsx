import React from 'react';
import './Card.css';
import play from './assets/play.svg';
import star from './assets/star.svg';
import cart from './assets/cart.svg';
import heart from './assets/heart.svg';
import bell from './assets/bell.svg';

interface IProps {
  photo: string;
  video: boolean;
  rating: number;
  code: number;
  title: string;
  price: number;
  discount: number | null;
}

class Card extends React.Component<IProps> {
  render() {
    const { discount, photo, code, price, rating, title, video } = this.props;
    return (
      <div className="card">
        {discount && <div className="card__discount">-{discount}%</div>}
        <div className="card__photo">
          <img width={180} src={photo} alt="photo" />
        </div>
        <div className="card__info">
          {video && (
            <div className="card__video">
              <img width={14} src={play} alt="play" />
              <span>Видео</span>
            </div>
          )}
          <div className="card__rating-code">
            <div className="card__rating">
              <img width={20} src={star} alt="star" />
              <span>{rating}</span>
            </div>
            <div className="card__code">
              Код: <span>{code}</span>
            </div>
          </div>
          <div className="card__title">{title}</div>
          {discount ? (
            <div className="card__price">
              <span>{price.toFixed(1)} </span>
              {(price - (price * discount) / 100).toFixed(1)} BYN
            </div>
          ) : (
            <div className="card__price">{price.toFixed(1)} BYN</div>
          )}

          <div className="card__btns">
            <button className="card__buy">Купить</button>
            <button className="card__cart">
              <img width={24} src={cart} alt="cart" />
            </button>
          </div>
        </div>
        <div className="card__add">
          <img width={24} src={heart} alt="heart" />
          <img width={24} src={bell} alt="bell" />
        </div>
      </div>
    );
  }
}

export default Card;
