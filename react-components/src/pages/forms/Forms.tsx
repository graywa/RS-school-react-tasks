import React, { useState } from 'react';
import './Forms.scss';
import download from './assets/Download.svg';
import Users from '../../components/users/Users';

export interface IUser {
  name: string;
  date: string;
  city: string;
  sex: string;
  photo: File | undefined;
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

function Forms() {
  const nameRef: React.RefObject<HTMLInputElement> = React.createRef(),
    dateRef: React.RefObject<HTMLInputElement> = React.createRef(),
    cityRef: React.RefObject<HTMLSelectElement> = React.createRef(),
    menRef: React.RefObject<HTMLInputElement> = React.createRef(),
    womenRef: React.RefObject<HTMLInputElement> = React.createRef(),
    photoRef: React.RefObject<HTMLInputElement> = React.createRef(),
    checkRef: React.RefObject<HTMLInputElement> = React.createRef(),
    formRef: React.RefObject<HTMLFormElement> = React.createRef();

  const getSex = () => {
    return menRef.current?.checked ? 'мужской' : womenRef.current?.checked ? 'женский' : '';
  };

  const [state, setState] = useState(initialState);

  const handleNameChange = () => {
    if (nameRef.current?.value) {
      setState({ ...state, nameError: '', formError: false });
    } else {
      setState({ ...state, nameError: 'введите ваше имя', formError: false });
    }
  };

  const handleDateChange = () => {
    if (dateRef.current?.value) {
      setState({ ...state, dateError: '', formError: false });
    } else {
      setState({ ...state, dateError: 'выберите дату поступления', formError: false });
    }
  };

  const handleCityChange = () => {
    if (cityRef.current?.value) {
      setState({ ...state, cityError: '', formError: false });
    } else {
      setState({ ...state, cityError: 'выберите ваш город', formError: false });
    }
  };

  const handleSexChange = () => {
    const sex = getSex();
    if (sex) {
      setState({ ...state, sexError: '', formError: false });
    } else {
      setState({ ...state, sexError: 'выберите ваш пол', formError: false });
    }
  };

  const handlePhotoChange = () => {
    if (photoRef.current?.files?.[0]) {
      setState({ ...state, photoError: '', formError: false });
    } else {
      setState({ ...state, photoError: 'загрузите ваше фото', formError: false });
    }
  };

  const handleCheckChange = () => {
    if (checkRef.current?.checked) {
      setState({ ...state, checkError: '', formError: false });
    } else {
      setState({ ...state, checkError: 'отметьте согласие', formError: false });
    }
  };

  const validate = () => {
    const sex = getSex();
    let nameError = '',
      dateError = '',
      cityError = '',
      sexError = '',
      photoError = '',
      checkError = '';

    if (!nameRef.current?.value) {
      nameError = 'введите ваше имя';
    }
    if (!dateRef.current?.value) {
      dateError = 'выберите дату поступления';
    }
    if (!cityRef.current?.value) {
      cityError = 'выберите ваш город';
    }
    if (!sex) {
      sexError = 'выберите ваш пол';
    }
    if (!photoRef.current?.files?.[0]) {
      photoError = 'загрузите ваше фото';
    }
    if (!checkRef.current?.checked) {
      checkError = 'отметьте согласие';
    }

    const formError = !(
      !!nameRef.current?.value &&
      !!dateRef.current?.value &&
      !!cityRef.current?.value &&
      (!!menRef.current?.checked || !!womenRef.current?.checked) &&
      !!nameRef.current?.value &&
      !!photoRef.current?.files?.[0] &&
      !!checkRef.current?.checked
    );

    formError
      ? setState({
          ...state,
          nameError,
          dateError,
          cityError,
          sexError,
          photoError,
          checkError,
          formError,
        })
      : setState({
          ...state,
          users: [
            ...state.users,
            {
              name: nameRef.current?.value,
              date: dateRef.current?.value,
              city: cityRef.current?.value,
              sex: sex,
              photo: photoRef.current?.files?.[0],
            },
          ],
          formError: true,
        });

    if (!formError) {
      formRef.current?.reset();
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    validate();
  };

  let url = '';
  if (photoRef.current?.files?.[0]) {
    url = URL.createObjectURL(photoRef?.current?.files?.[0]);
  }

  return (
    <div className="forms">
      <form ref={formRef} className="form" action="/" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        <div className="form__name">
          <label htmlFor="name">
            Ваше имя:
            <input id="name" type="text" name="name" ref={nameRef} onChange={handleNameChange} />
            {state.nameError && <div className="form__error">{state.nameError}</div>}
          </label>
        </div>

        <div className="form__date">
          <label htmlFor="date">
            Дата поступления:
            <input id="date" type="date" name="date" ref={dateRef} onChange={handleDateChange} />
            {state.dateError && <div className="form__error">{state.dateError}</div>}
          </label>
        </div>

        <div className="form__sity">
          <label htmlFor="city">
            Ваш город:
            <select id="city" name="city" ref={cityRef} onChange={handleCityChange}>
              <option></option>
              <option value="Минск">Минск</option>
              <option value="Гомель">Гомель</option>
              <option value="Брест">Брест</option>
              <option value="Гродно">Гродно</option>
              <option value="Могилев">Могилев</option>
              <option value="Витебск">Витебск</option>
            </select>
            {state.cityError && <div className="form__error">{state.cityError}</div>}
          </label>
        </div>

        <div className="form__sex">
          Ваш пол:
          <div className="form__sex-item">
            <input id="men" type="radio" name="sex" ref={menRef} onChange={handleSexChange} />
            <label htmlFor="men">Мужской</label>
          </div>
          <div className="form__sex-item">
            <input id="women" type="radio" name="sex" ref={womenRef} onChange={handleSexChange} />
            <label htmlFor="women">
              Женский
              {state.sexError && <div className="form__error sex">{state.sexError}</div>}
            </label>
          </div>
        </div>

        <div className="form__photo">
          <input type="file" id="photo" ref={photoRef} onChange={handlePhotoChange} />
          <label htmlFor="photo">
            Выбрать фото
            <img width={20} src={download} alt="download" />
            {url && <img width={40} src={url} alt="photo" />}
            {state.photoError && <div className="form__error">{state.photoError}</div>}
          </label>
        </div>

        <div className="form__check">
          <input
            type="checkbox"
            id="check"
            name="check"
            ref={checkRef}
            onChange={handleCheckChange}
          />
          <label htmlFor="check">
            Согласен на обработку данных
            {state.checkError && <div className="form__error">{state.checkError}</div>}
          </label>
        </div>
        <button type="submit" disabled={state.formError}>
          Зарегистрироваться
        </button>
      </form>

      <Users users={state.users} />
    </div>
  );
}

export default Forms;
