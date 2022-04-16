import React from 'react';
import { IUser } from '../../pages/forms/Forms';
import User from '../user/User';
import './Users.scss';

interface IProps {
  users: IUser[];
}

function Users(props: IProps) {
  const { users } = props;
  return (
    <div className="users">
      {users.length
        ? users.map((el, ind) => {
            let url = '';
            if (el.photo) {
              url = URL.createObjectURL(el?.photo);
            }
            return (
              <User
                key={ind}
                photo={url}
                name={el.name}
                date={el.date}
                city={el.city}
                sex={el.sex}
              />
            );
          })
        : 'Пользователи отсутствуют'}
    </div>
  );
}

export default Users;
