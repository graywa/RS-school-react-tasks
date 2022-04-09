import React from 'react';
import './Forms.scss';
import download from './assets/Download.svg';
import Users from '../../components/users/Users';

export interface IUser {
  name: string;
  date: string;
  city: string;
  sex: string;
  photo: File;
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
  formRef: React.RefObject<HTMLFormElement> = React.createRef();

  getSex = () => {
    return this.menRef.current?.checked
      ? 'мужской'
      : this.womenRef.current?.checked
      ? 'женский'
      : '';
  };

  state: IState = initialState;

  handleNameChange = () => {
    if (this.nameRef.current?.value) {
      this.setState({ nameError: '', formError: false });
    } else {
      this.setState({ nameError: 'введите ваше имя', formError: false });
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
      this.setState({ checkError: 'отметьте согласие', formError: false });
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
      nameError = 'введите ваше имя';
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
            },
          ],
          formError: true,
        });

    if (!formError) {
      this.formRef.current?.reset();
    }
  };

  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.validate();
  };

  render() {
    let url = '';
    if (this.photoRef.current?.files?.[0]) {
      url = URL.createObjectURL(this.photoRef?.current?.files?.[0]);
    }

    return (
      <div className="forms">
        <form ref={this.formRef} className="form" action="/" onSubmit={this.handleSubmit}>
          <h2>Регистрация</h2>
          <div className="form__name">
            <label htmlFor="name">
              Ваше имя:
              <input
                id="name"
                type="text"
                name="name"
                ref={this.nameRef}
                onChange={this.handleNameChange}
              />
              {this.state.nameError && <div className="form__error">{this.state.nameError}</div>}
            </label>
          </div>

          <div className="form__date">
            <label htmlFor="date">
              Дата поступления:
              <input
                id="date"
                type="date"
                name="date"
                ref={this.dateRef}
                onChange={this.handleDateChange}
              />
              {this.state.dateError && <div className="form__error">{this.state.dateError}</div>}
            </label>
          </div>

          <div className="form__sity">
            <label htmlFor="city">
              Ваш город:
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
            </label>
          </div>

          <div className="form__sex">
            Ваш пол:
            <div className="form__sex-item">
              <input
                id="men"
                type="radio"
                name="sex"
                ref={this.menRef}
                onChange={this.handleSexChange}
              />
              <label htmlFor="men">Мужской</label>
            </div>
            <div className="form__sex-item">
              <input
                id="women"
                type="radio"
                name="sex"
                ref={this.womenRef}
                onChange={this.handleSexChange}
              />
              <label htmlFor="women">
                Женский
                {this.state.sexError && (
                  <div className="form__error sex">{this.state.sexError}</div>
                )}
              </label>
            </div>
          </div>

          <div className="form__photo">
            <input type="file" id="photo" ref={this.photoRef} onChange={this.handlePhotoChange} />
            <label htmlFor="photo">
              Выбрать фото
              <img width={20} src={download} alt="download" />
              {url && <img width={40} src={url} alt="photo" />}
              {this.state.photoError && <div className="form__error">{this.state.photoError}</div>}
            </label>
          </div>

          <div className="form__check">
            <input
              type="checkbox"
              id="check"
              name="check"
              ref={this.checkRef}
              onChange={this.handleCheckChange}
            />
            <label htmlFor="check">
              Согласен на обработку данных
              {this.state.checkError && <div className="form__error">{this.state.checkError}</div>}
            </label>
          </div>
          <button type="submit" disabled={this.state.formError}>
            Зарегистрироваться
          </button>
        </form>

        <Users users={this.state.users} />
      </div>
    );
  }
}

export default Forms;
