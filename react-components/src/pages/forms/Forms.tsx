import React, { FC, useEffect, useState } from 'react';
import './Forms.scss';
import download from './assets/Download.svg';
import Users from '../../components/users/Users';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { addUser, saveFiedsForm } from '../../store/usersSlice';

interface IFormData {
  name: string;
  date: string;
  city: string;
  sex: string;
  photo: File[] | undefined;
  check: boolean;
}

export interface IUser {
  name: string;
  date: string;
  city: string;
  sex: string;
  photoUrl: string;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Слишком короткое имя')
    .max(10, 'Слишком длинное имя')
    .required('Обязательное поле'),
  date: yup
    .string()
    .test('data', 'Вы из будущего?', (value: string | undefined) => {
      if (value) {
        const currDate = new Date();
        const selectedDate = new Date(value);
        return currDate > selectedDate;
      }
      return true;
    })
    .required('Обязательно поле'),
  city: yup.string().required('Обязательно поле'),
  sex: yup.string().required('Обязательно поле').nullable(),
  photo: yup.mixed().test('hasFile', 'Выберите фото', (file) => {
    if (file.length) {
      return true;
    } else {
      return false;
    }
  }),
  check: yup.boolean().oneOf([true], 'Необходимо отметить').required('Обязательно поле'),
});

const Forms: FC = () => {
  const { userName, date, city, sex, photo, check } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    getValues,
  } = useForm<IFormData>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormData> = ({ name, date, city, sex, photo }: IFormData) => {
    const photoUrl = URL.createObjectURL(photo![0]) || '';
    const user = { name, date, city, sex, photoUrl };
    dispatch(addUser(user));
    dispatch(saveFiedsForm({ name: '', date: '', city: '', sex: '', check: false }));
    reset();
    setIsOpenModal(true);
    setTimeout(() => {
      setIsOpenModal(false);
    }, 2000);
  };

  useEffect(() => {
    return () => {
      const [name, date, city, sex, check] = getValues(['name', 'date', 'city', 'sex', 'check']);
      dispatch(saveFiedsForm({ name, date, city, sex, check }));
    };
  }, []);

  return (
    <div className="form-wrapper">
      <form className="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>
        <div className="form__name">
          <label htmlFor="name">
            Ваше имя:
            <input id="name" defaultValue={userName} {...register('name')} />
            <div className="form__error">{errors.name?.message}</div>
          </label>
        </div>

        <div className="form__date">
          <label htmlFor="date">
            Дата поступления:
            <input id="date" defaultValue={date} type="date" {...register('date')} />
            <div className="form__error">{errors.date?.message}</div>
          </label>
        </div>

        <div className="form__sity">
          <label htmlFor="city">
            Ваш город:
            <select id="city" defaultValue={city} {...register('city')}>
              <option value=""> </option>
              <option value="Минск">Минск</option>
              <option value="Гомель">Гомель</option>
              <option value="Брест">Брест</option>
              <option value="Гродно">Гродно</option>
              <option value="Могилев">Могилев</option>
              <option value="Витебск">Витебск</option>
            </select>
            <div className="form__error">{errors.city?.message}</div>
          </label>
        </div>

        <div className="form__sex">
          Ваш пол:
          <div className="form__sex-item">
            <input
              id="men"
              defaultChecked={sex === 'мужской' ? true : false}
              type="radio"
              value="мужской"
              {...register('sex')}
            />
            <label htmlFor="men">Мужской</label>
          </div>
          <div className="form__sex-item">
            <input
              id="women"
              defaultChecked={sex === 'женский' ? true : false}
              type="radio"
              value="женский"
              {...register('sex')}
            />
            <label htmlFor="women">
              Женский
              <div className="form__error">{errors.sex?.message}</div>
            </label>
          </div>
        </div>

        <div className="form__photo">
          <input type="file" id="photo" {...register('photo')} />
          <label htmlFor="photo">
            Выбрать фото
            <img width={20} src={download} alt="download" />
            <div className="form__error">{errors.photo && 'Выберите фото'}</div>
          </label>
        </div>

        <div className="form__check">
          <input
            type="checkbox"
            id="check"
            defaultChecked={check === true && true}
            {...register('check')}
          />
          <label htmlFor="check">
            Согласен на обработку данных
            <div className="form__error">{errors.check?.message}</div>
          </label>
        </div>
        <button type="submit" disabled={!isDirty || !!Object.keys(errors).length}>
          Зарегистрироваться
        </button>
      </form>

      <div
        className={isOpenModal ? 'form-modal open' : 'form-modal'}
        onClick={() => setIsOpenModal(false)}
      >
        <div className="form-modal__content" onClick={(e) => e.stopPropagation()}>
          <p>Данные успешно сохранены</p>
          <button onClick={() => setIsOpenModal(false)}>Ok</button>
        </div>
      </div>

      <Users />
    </div>
  );
};

export default Forms;
