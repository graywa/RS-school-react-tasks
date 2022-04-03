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

interface IState {
  users: IUser[];
  nameError: string;
  dateError: string;
  cityError: string;
  sexError: string;
  photoError: string;
  checkError: string;
  formError: boolean;
}

const initialState: IState = {
  users: [] as IUser[],
  nameError: '',
  dateError: '',
  cityError: '',
  sexError: '',
  photoError: '',
  checkError: '',
  formError: true,
};

class Forms extends React.Component {
  nameRef: React.RefObject<HTMLInputElement> = React.createRef();
  dateRef: React.RefObject<HTMLInputElement> = React.createRef();
  cityRef: React.RefObject<HTMLSelectElement> = React.createRef();
  menRef: React.RefObject<HTMLInputElement> = React.createRef();
  womenRef: React.RefObject<HTMLInputElement> = React.createRef();
  photoRef: React.RefObject<HTMLInputElement> = React.createRef();
  checkRef: React.RefObject<HTMLInputElement> = React.createRef();

  getSex = () => {
    return this.menRef.current?.checked ? 'men' : this.womenRef.current?.checked ? 'women' : '';
  };

  state: IState = initialState;

  handleNameChange = () => {
    if (this.nameRef.current?.value) {
      this.setState({ nameError: '', formError: false });
    } else {
      this.setState({ nameError: 'введите ваше ', formError: false });
    }
  };

  handleDateChange = () => {
    if (this.dateRef.current?.value) {
      this.setState({ dateError: '', formError: false });
    } else {
      this.setState({ dateError: 'выберите дату поступления', formError: false });
    }
  };

  handleCityChange = () => {
    if (this.cityRef.current?.value) {
      this.setState({ cityError: '', formError: false });
    } else {
      this.setState({ cityError: 'выберите ваш город', formError: false });
    }
  };

  handleSexChange = () => {
    const sex = this.getSex();
    if (sex) {
      this.setState({ sexError: '', formError: false });
    } else {
      this.setState({ sexError: 'выберите ваш пол', formError: false });
    }
  };

  handlePhotoChange = () => {
    if (this.photoRef.current?.files?.[0]) {
      this.setState({ photoError: '', formError: false });
    } else {
      this.setState({ photoError: 'загрузите ваше фото', formError: false });
    }
  };

  handleCheckChange = () => {
    if (this.checkRef.current?.checked) {
      this.setState({ checkError: '', formError: false });
    } else {
      this.setState({ checkError: 'выберите ваш город', formError: false });
    }
  };

  validate = () => {
    const sex = this.getSex();
    let nameError = '',
      dateError = '',
      cityError = '',
      sexError = '',
      photoError = '',
      checkError = '';

    if (!this.nameRef.current?.value) {
      nameError = 'введите ваше ';
    }
    if (!this.dateRef.current?.value) {
      dateError = 'выберите дату поступления';
    }
    if (!this.cityRef.current?.value) {
      cityError = 'выберите ваш город';
    }
    if (!sex) {
      sexError = 'выберите ваш пол';
    }
    if (!this.photoRef.current?.files?.[0]) {
      photoError = 'загрузите ваше фото';
    }
    if (!this.checkRef.current?.checked) {
      checkError = 'отметьте согласие';
    }

    const formError = !(
      !!this.nameRef.current?.value &&
      !!this.dateRef.current?.value &&
      !!this.cityRef.current?.value &&
      (!!this.menRef.current?.checked || !!this.womenRef.current?.checked) &&
      !!this.nameRef.current?.value &&
      !!this.photoRef.current?.files?.[0] &&
      !!this.checkRef.current?.checked
    );

    formError
      ? this.setState({
          nameError,
          dateError,
          cityError,
          sexError,
          photoError,
          checkError,
          formError,
        })
      : this.setState({
          users: [
            ...this.state.users,
            {
              name: this.nameRef.current?.value,
              date: this.dateRef.current?.value,
              city: this.cityRef.current?.value,
              sex: sex,
              photo: this.photoRef.current?.files?.[0],
              check: this.checkRef.current?.checked,
            },
          ],
          formError,
        });

    if (!formError) {
      this.resetForm();
    }
  };

  resetForm = () => {
    if (this.nameRef.current?.value) {
      this.nameRef.current.value = '';
    }

    this.dateRef.current!.value = '';
    this.cityRef.current!.value = '';
    this.menRef.current!.checked = false;
    this.womenRef.current!.checked = false;
    this.nameRef.current!.value = '';
    this.photoRef.current!.files = null;
    this.checkRef.current!.checked = false;
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.validate();
  };

  render() {
    console.log(this.state);
    return (
      <div className="forms">
        <form className="form" action="/" onSubmit={this.handleSubmit}>
          <h2>Регистрация</h2>
          <div className="form__name">
            <label htmlFor="name">Ваше имя: </label>
            <input
              id="name"
              type="text"
              name="name"
              ref={this.nameRef}
              onChange={this.handleNameChange}
            />
          </div>
          {this.state.nameError && <div className="form__error">{this.state.nameError}</div>}

          <div className="form__date">
            <label htmlFor="date">Дата поступления: </label>
            <input type="date" name="date" ref={this.dateRef} onChange={this.handleDateChange} />
            {this.state.dateError && <div className="form__error">{this.state.dateError}</div>}
          </div>

          <div className="form__sity">
            <label htmlFor="city">Ваш город: </label>
            <select id="city" name="city" ref={this.cityRef} onChange={this.handleCityChange}>
              <option></option>
              <option value="Минск">Минск</option>
              <option value="Гомель">Гомель</option>
              <option value="Брест">Брест</option>
              <option value="Гродно">Гродно</option>
              <option value="Могилев">Могилев</option>
              <option value="Витебск">Витебск</option>
            </select>
            {this.state.cityError && <div className="form__error">{this.state.cityError}</div>}
          </div>

          <div className="form__sex">
            Ваш пол:
            <div>
              <input
                id="men"
                type="radio"
                name="sex"
                ref={this.menRef}
                onChange={this.handleSexChange}
              />
              <label htmlFor="men">Мужской</label>
            </div>
            <div>
              <input
                id="women"
                type="radio"
                name="sex"
                ref={this.womenRef}
                onChange={this.handleSexChange}
              />
              <label htmlFor="women">Женский</label>
            </div>
            {this.state.sexError && <div className="form__error">{this.state.sexError}</div>}
          </div>

          <input type="file" id="photo" ref={this.photoRef} onChange={this.handlePhotoChange} />
          <label htmlFor="photo">Выбрать фото</label>
          {this.state.photoError && <div className="form__error">{this.state.photoError}</div>}

          <div className="form__check">
            <input
              type="checkbox"
              id="check"
              name="check"
              ref={this.checkRef}
              onChange={this.handleCheckChange}
            />
            <label htmlFor="check">Согласен на обработку данных</label>
            {this.state.checkError && <div className="form__error">{this.state.checkError}</div>}
          </div>
          <button type="submit" disabled={this.state.formError}>
            Зарегистрироваться
          </button>
        </form>

        <div className="users">
          {this.state.users.length
            ? this.state.users.map((el, ind) => {
                const url = URL.createObjectURL(el?.photo);
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
