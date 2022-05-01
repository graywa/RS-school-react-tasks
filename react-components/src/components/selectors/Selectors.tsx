import React, { ChangeEvent, FC } from 'react';
import { useAppDispatch } from '../../hooks/redux-hooks';
import { getCharactersByFilter } from '../../store/AsyncActionCreators';
import {
  changeLimitOnPage,
  changeCurrPage,
  changeStatus,
  changeSort,
} from '../../store/charactersSlice';
import { actionTypes, CHANGE_LIMIT_ON_PAGE, CHANGE_SORT, CHANGE_STATUS } from '../../store/store';
import './Selectors.scss';

interface IProps {
  limitOnPage: number;
  status: string;
  sort: 'name' | 'gender' | 'status' | 'species' | '';
  searchValue: string;
}

const Selectors: FC<IProps> = ({ limitOnPage = 20, status, sort, searchValue }) => {
  const dispatch = useAppDispatch();

  const changeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const updLimitOnPage = Number(e.target.value);

    dispatch(changeLimitOnPage(updLimitOnPage));
    dispatch(getCharactersByFilter({ fetchPage: 1, searchValue, status }));
    dispatch(changeCurrPage(1));
  };

  const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
    const updStatus = e.target.value;
    dispatch(changeStatus(updStatus));
    dispatch(getCharactersByFilter({ fetchPage: 1, searchValue, status: updStatus }));
    dispatch(changeCurrPage(1));
  };

  const handleChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const updSort = e.target.value;

    if (
      updSort === 'name' ||
      updSort === 'gender' ||
      updSort === 'name' ||
      updSort === 'status' ||
      updSort === 'species' ||
      updSort === ''
    ) {
      dispatch(changeSort(updSort));
    }
  };

  return (
    <div className="selectors">
      <div className="selector">
        <label>
          {`Выберите количество персонажей на странице: `}
          <select value={limitOnPage} onChange={(e) => changeLimit(e)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>

      <div className="selector">
        <label>
          {`Выберите статус персонажа: `}
          <select value={status} onChange={(e) => handleChangeStatus(e)}>
            <option value=""></option>
            <option value="alive">жив</option>
            <option value="dead">мертв</option>
            <option value="unknown">неизвестно</option>
          </select>
        </label>
      </div>

      <div className="selector">
        <label>
          {`Сортировать персонажей по: `}
          <select value={sort} onChange={(e) => handleChangeSort(e)}>
            <option value=""></option>
            <option value="name">имени</option>
            <option value="status">статусу</option>
            <option value="gender">полу</option>
            <option value="species">виду</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Selectors;
