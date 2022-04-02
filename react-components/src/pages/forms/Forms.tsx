import React from 'react';
import './Forms.scss';

class Forms extends React.Component {
  nameRef: React.RefObject<HTMLInputElement> = React.createRef();
  dateRef: React.RefObject<HTMLInputElement> = React.createRef();
  cityRef: React.RefObject<HTMLSelectElement> = React.createRef();
  sexRef: React.RefObject<HTMLInputElement> = React.createRef();
  photoRef: React.RefObject<HTMLInputElement> = React.createRef();
  checkRef: React.RefObject<HTMLInputElement> = React.createRef();

  state = {
    users: [],
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  render() {
    return (
      <div className="forms">
        <h2>Регистрация</h2>
        <form className="form" action="/" onSubmit={this.handleSubmit}>
          <div className="form__name">
            <label htmlFor="name">Ваше имя: </label>
            <input id="name" type="text" name="name" ref={this.nameRef} />
          </div>
          <div className="form__date">
            <label htmlFor="date">Дата вашего рождения: </label>
            <input type="date" name="name" ref={this.dateRef} />
          </div>

          <div className="form__sity">
            <label htmlFor="city">Ваш город: </label>
            <select id="city" name="city" ref={this.cityRef}>
              <option value="minsk">Минск</option>
              <option value="gomel">Гомель</option>
              <option value="brest">Брест</option>
              <option value="grodno">Гродно</option>
              <option value="mogilev">Могилев</option>
              <option value="vitebsk">Витебск</option>
            </select>
          </div>

          <div className="form__sex">
            Ваш пол:
            <div>
              <input id="men" type="radio" name="sex" ref={this.sexRef} />
              <label htmlFor="men">Мужской</label>
            </div>
            <div>
              <input id="women" type="radio" name="sex" ref={this.sexRef} />
              <label htmlFor="women">Женский</label>
            </div>
          </div>

          <input type="file" id="photo" ref={this.photoRef} />
          <label htmlFor="photo">Выбрать фото</label>
          <div className="form__check">
            <input type="checkbox" id="check" name="check" ref={this.checkRef} />
            <label htmlFor="check">Согласен на обработку данных</label>
          </div>
          <button type="submit">Зарегистрироваться</button>
        </form>
      </div>
    );
  }
}

export default Forms;
