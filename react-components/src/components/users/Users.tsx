import React from 'react';
import { IUser } from '../../pages/forms/Forms';
import User from '../user/User';
import './Users.scss';

interface IProps {
  users: IUser[];
}

class Users extends React.Component<IProps> {
  render() {
    const { users } = this.props;
    return (
      <div className="users">
        {users.length
          ? users.map((el, ind) => {
              const url = URL.createObjectURL(el?.photo);
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
}

export default Users;
