import React, { FC } from 'react';
import { actionTypes, CHANGE_LIMIT_ON_PAGE } from '../../store/store';
import './Selectors.scss';

interface IProps {
  limitOnPage: number;
  dispatch: React.Dispatch<actionTypes>;
}

const Selectors: FC<IProps> = ({ limitOnPage = 20, dispatch }) => {
  return (
    <div className="selectors">
      <div className="selector">
        <label>
          Выберите количество персонажей на странице:
          <select
            value={limitOnPage}
            onChange={(e) =>
              dispatch({ type: CHANGE_LIMIT_ON_PAGE, limitOnPage: Number(e.target.value) })
            }
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default Selectors;
