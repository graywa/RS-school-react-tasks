import React from 'react';
import './User.scss';

interface IProps {
  name: string;
  date: string;
  city: string;
  sex: string;
  photo: string;
}

function User(props: IProps) {
  const { name, date, city, photo, sex } = props;
  return (
    <div className="user">
      <div className="user__photo">
        <img width={150} src={photo} alt="photo" />
      </div>
      <div className="user__name">
        <span>Имя: </span> {name}
      </div>
      <div className="user__date">
        <span>Дата поступления: </span>
        <div>{date}</div>
      </div>
      <div className="user__city">
        <span>Город: </span> {city}
      </div>
      <div className="user__sex">
        <span>Пол: </span> {sex}
      </div>
    </div>
  );
}

export default User;
