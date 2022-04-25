import React, { FC, useContext } from 'react';
import { StateContext } from '../../context/context';
import { IUser } from '../../pages/forms/Forms';
import User from '../user/User';
import './Users.scss';

const Users: FC = () => {
  const {
    state: { users },
  } = useContext(StateContext);

  //const { users } = state;
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
