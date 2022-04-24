import React, { FC, useContext, useEffect, useState } from 'react';
import { actionTypes, CHANGE_PAGE } from '../../store/store';
import './Paginator.scss';

interface IProps2 {
  limitOnPage: number;
  totalItems: number;
  currPage: number;
  dispatch: React.Dispatch<actionTypes>;
}

const Paginator: FC<IProps2> = ({ dispatch, limitOnPage, currPage, totalItems }) => {
  const pages = [];
  const totalPages = Math.ceil(totalItems / limitOnPage);

  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }

  return (
    <div className="pages">
      {pages.map((el) => (
        <span
          key={el}
          className={el === currPage ? 'page current' : 'page'}
          onClick={() => dispatch({ type: CHANGE_PAGE, currPage: el })}
        >
          {el}
        </span>
      ))}
    </div>
  );
};

export default Paginator;
