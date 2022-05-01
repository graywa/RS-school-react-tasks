import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/header/Header';
import Card from './components/card/Card';
import App from './App';
import SearchBar from './components/search-bar/SearchBar';
import userEvent from '@testing-library/user-event';
import Cards from './components/cards/Cards';
import RickMorty from './pages/rick-morty/RickMorty';
import Page404 from './pages/page-404/Page404';

describe('render', () => {
  test('render page 404', () => {
    const { getByText } = render(<Page404 />);
    const element = getByText(/Page not found/i);
    expect(element).toBeInTheDocument();
  });

  test('render link home', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const homeLink = getByText(/Rick and Morty/i);
    expect(homeLink).toBeInTheDocument();
  });

  test('render card', () => {
    const { getByText } = render(
      <Card discount={null} photo={''} code={43} price={112} rating={3} title={''} video={true} />
    );
    const price = getByText(/112/i);
    expect(price).toBeInTheDocument();
  });

  test('render all cards', () => {
    const { getAllByText } = render(<Cards />);
    const cards = getAllByText(/купить/i);
    expect(cards.length).toBe(12);
  });

  test('render search input', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    screen.getByRole('banner');
    expect(screen.getByPlaceholderText('search...'));
  });
});

describe('events', () => {
  test('type in input', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Hello' } });
    expect(screen.queryByDisplayValue('Hello')).toBeInTheDocument();
  });

  test('more type in input', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    userEvent.type(screen.getByRole('textbox'), ' World');
    expect(screen.queryByDisplayValue('Hello World')).toBeInTheDocument();
    screen.debug();
  });

  test('click on about link', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByText(/About Us/));
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  test('focus on input', () => {
    const { getByTestId } = render(<SearchBar status={''} searchValue={''} />);
    const input = getByTestId('search-input');
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });
});

describe('mock localStorage', () => {
  interface EmptyObject {
    [key: string]: string;
  }

  const storageMock = (function () {
    const storage: EmptyObject = {};

    return {
      setItem: function (key: string, value: string) {
        storage[key] = value || '';
      },
      getItem: function (key: string) {
        return storage[key] || null;
      },
      removeItem: function (key: string) {
        delete storage[key];
      },
      get length() {
        return Object.keys(storage).length;
      },
      key: function (i: number) {
        const keys = Object.keys(storage);
        return keys[i] || null;
      },
      clear: function () {
        return {};
      },
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: storageMock,
  });

  test('setItem to localStorage', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    userEvent.click(getByText(/Rick and Morty/i));
    userEvent.type(screen.getByRole('textbox'), 'No war');
    userEvent.click(getByText(/about us/i));
    expect(localStorage.getItem('searchValue')).toBe('No war');
  });

  test('getItem from localStorage', () => {
    render(
      <BrowserRouter>
        <RickMorty />
      </BrowserRouter>
    );
    expect(screen.getByDisplayValue('No war')).toBeInTheDocument();
  });
});
