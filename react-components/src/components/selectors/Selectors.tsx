import React, { ChangeEvent, FC } from 'react';
import { actionTypes, CHANGE_LIMIT_ON_PAGE, CHANGE_SORT, CHANGE_STATUS } from '../../store/store';
import './Selectors.scss';

interface IProps {
  limitOnPage: number;
  status: string;
  sort: 'name' | 'gender' | 'status' | 'species' | '';
  currPage: number;
  dispatch: React.Dispatch<actionTypes>;
}

const Selectors: FC<IProps> = ({ limitOnPage = 20, status, sort, dispatch, currPage }) => {
  const changeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
    const updLimitOnPage = Number(e.target.value);
    const updCurrPage = Math.ceil((currPage * limitOnPage) / updLimitOnPage);
    dispatch({
      type: CHANGE_LIMIT_ON_PAGE,
      limitOnPage: updLimitOnPage,
      currPage: updCurrPage,
    });
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
          <select
            value={status}
            onChange={(e) => {
              dispatch({
                type: CHANGE_STATUS,
                status: e.target.value,
              });
            }}
          >
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
          <select
            value={sort}
            onChange={(e) => {
              const val = e.target.value;
              if (
                val === 'name' ||
                val === 'gender' ||
                val === 'name' ||
                val === 'status' ||
                val === 'species' ||
                val === ''
              ) {
                dispatch({
                  type: CHANGE_SORT,
                  sort: val,
                });
              }
            }}
          >
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
