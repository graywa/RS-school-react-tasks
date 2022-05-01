import React, { FC } from 'react';
import { useAppSelector } from '../../hooks/redux-hooks';
import User from '../user/User';
import './Users.scss';

const Users: FC = () => {
  const { users } = useAppSelector((state) => state.users);

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
};

export default Users;
