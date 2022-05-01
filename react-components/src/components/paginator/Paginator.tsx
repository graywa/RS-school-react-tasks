import React, { FC, useContext, useEffect, useState } from 'react';
import { getFetchPage } from '../../helpers/helpers';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { getCharactersByFilter } from '../../store/AsyncActionCreators';
import { changeCurrPage } from '../../store/charactersSlice';
import { actionTypes, CHANGE_PAGE } from '../../store/store';
import './Paginator.scss';

interface IProps2 {
  limitOnPage: number;
  totalItems: number;
  currPage: number;
}

const Paginator: FC<IProps2> = ({ limitOnPage, currPage, totalItems }) => {
  const dispatch = useAppDispatch();
  const { searchValue, status } = useAppSelector((state) => state.characters);
  const pages = [];
  const totalPages = Math.ceil(totalItems / limitOnPage);

  for (let page = 1; page <= totalPages; page++) {
    pages.push(page);
  }

  const handlePageChange = (el: number) => {
    dispatch(changeCurrPage(el));
    const fetchPage = getFetchPage(limitOnPage, el);
    dispatch(getCharactersByFilter({ fetchPage, searchValue, status }));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currPage]);

  return (
    <div className="pages">
      {pages.map((el) => (
        <span
          key={el}
          className={el === currPage ? 'page current' : 'page'}
          onClick={() => handlePageChange(el)}
        >
          {el}
        </span>
      ))}
    </div>
  );
};

export default Paginator;
