import React from 'react';
import './Forms.scss';

interface IUser {
  name: string;
  date: string;
  city: string;
  sex: string;
  photo: File;
  check: boolean;
}

class Forms extends React.Component {
  nameRef: React.RefObject<HTMLInputElement> = React.createRef();
  dateRef: React.RefObject<HTMLInputElement> = React.createRef();
  cityRef: React.RefObject<HTMLSelectElement> = React.createRef();
  menRef: React.RefObject<HTMLInputElement> = React.createRef();
  womenRef: React.RefObject<HTMLInputElement> = React.createRef();
  photoRef: React.RefObject<HTMLInputElement> = React.createRef();
  checkRef: React.RefObject<HTMLInputElement> = React.createRef();

  sex: string = this.menRef.current?.checked
    ? 'men'
    : this.womenRef.current?.checked
    ? 'women'
    : '';

  state = {
    users: [] as IUser[],
    errors: {
      name: 'введите ваше имя',
      date: 'выберите дату поступления',
      city: 'выберите ваш город',
      sex: 'выберите ваш пол',
      photo: 'загрузите ваше фото',
      check: 'отметьте согласие',
    },
  };

  handleName = () => {
    if (this.nameRef.current?.value) {
      this.setState({ errors: { ...this.state.errors, name: '' } });
    } else {
      this.setState({ errors: { ...this.state.errors, name: 'введите ваше ' } });
    }
  };

  handleDate = () => {
    if (this.dateRef.current?.value) {
      this.setState({ errors: { ...this.state.errors, date: '' } });
    } else {
      this.setState({ errors: { ...this.state.errors, date: 'выберите дату поступления' } });
    }
  };

  handleCity = () => {
    if (this.cityRef.current?.value) {
      this.setState({ errors: { ...this.state.errors, city: '' } });
    } else {
      this.setState({ errors: { ...this.state.errors, city: 'выберите ваш город' } });
    }
  };

  handleSex = () => {
    if (this.sex) {
      this.setState({ errors: { ...this.state.errors, sex: '' } });
    } else {
      this.setState({ errors: { ...this.state.errors, sex: 'выберите ваш пол' } });
    }
  };

  handlePhoto = () => {
    if (this.photoRef.current?.files?.[0]) {
      this.setState({ errors: { ...this.state.errors, photo: '' } });
    } else {
      this.setState({ errors: { ...this.state.errors, photo: 'загрузите ваше фото' } });
    }
  };

  handleCheck = () => {
    if (this.checkRef.current?.value) {
      this.setState({ errors: { ...this.state.errors, check: '' } });
    } else {
      this.setState({ errors: { ...this.state.errors, check: 'отметьте согласие' } });
    }
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.setState({
      users: [
        ...this.state.users,
        {
          name: this.nameRef.current?.value,
          date: this.dateRef.current?.value,
          city: this.cityRef.current?.value,
          sex: this.sex,
          photo: this.photoRef.current?.files?.[0],
          check: this.checkRef.current?.checked,
        },
      ],
    });
  };

  render() {
    const { name, check, city, date, photo, sex } = this.state.errors;
    const formError = !!name || !!check || !!city || !!date || !!photo || !!sex;

    return (
      <div className="forms">
        <h2>Регистрация</h2>
        <form className="form" action="/" onSubmit={this.handleSubmit}>
          <div className="form__name">
            <label htmlFor="name">Ваше имя: </label>
            <input
              id="name"
              type="text"
              name="name"
              ref={this.nameRef}
              onChange={this.handleName}
            />
          </div>
          {this.state.errors.name && <div className="form__error">{this.state.errors.name}</div>}

          <div className="form__date">
            <label htmlFor="date">Дата вашего рождения: </label>
            <input type="date" name="name" ref={this.dateRef} onChange={this.handleDate} />
          </div>

          <div className="form__sity">
            <label htmlFor="city">Ваш город: </label>
            <select id="city" name="city" ref={this.cityRef} onChange={this.handleCity}>
              <option value="Минск">Минск</option>
              <option value="Гомель">Гомель</option>
              <option value="Брест">Брест</option>
              <option value="Гродно">Гродно</option>
              <option value="Могилев">Могилев</option>
              <option value="Витебск">Витебск</option>
            </select>
          </div>

          <div className="form__sex">
            Ваш пол:
            <div>
              <input id="men" type="radio" name="sex" ref={this.menRef} onChange={this.handleSex} />
              <label htmlFor="men">Мужской</label>
            </div>
            <div>
              <input
                id="women"
                type="radio"
                name="sex"
                ref={this.womenRef}
                onChange={this.handleSex}
              />
              <label htmlFor="women">Женский</label>
            </div>
          </div>

          <input type="file" id="photo" ref={this.photoRef} onChange={this.handlePhoto} />
          <label htmlFor="photo">Выбрать фото</label>
          <div className="form__check">
            <input
              type="checkbox"
              id="check"
              name="check"
              ref={this.checkRef}
              onChange={this.handleCheck}
            />
            <label htmlFor="check">Согласен на обработку данных</label>
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>

        <div className="users">
          {this.state.users.length
            ? this.state.users.map((el, ind) => {
                const url = URL.createObjectURL(el.photo);
                return (
                  <div key={ind} className="user">
                    <div className="user__photo">
                      <img width={150} height={150} src={url} alt="photo" />
                    </div>
                    <div className="user__name">
                      <span>Имя: </span> {el.name}
                    </div>
                    <div className="user__date">
                      <span>Дата поступления: </span> {el.date}
                    </div>
                    <div className="user__city">
                      <span>Город: </span> {el.city}
                    </div>
                    <div className="user__sex">
                      <span>Пол: </span> {el.sex}
                    </div>
                  </div>
                );
              })
            : 'Пользователи отсутствуют'}
        </div>
      </div>
    );
  }
}

export default Forms;
