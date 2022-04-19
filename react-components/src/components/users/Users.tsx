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
            return (
              <User
                key={ind}
                photo={el.photoUrl}
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
