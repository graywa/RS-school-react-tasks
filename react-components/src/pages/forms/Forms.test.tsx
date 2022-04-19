import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { renderWidthRouter } from '../../components/tests-helpers/renderWithRouter';
import User from '../../components/user/User';

describe('render', () => {
  test('render forms page', () => {
    renderWidthRouter(<App />);
    const formsLink = screen.getByText('Forms');
    expect(formsLink).toBeInTheDocument();
    userEvent.click(formsLink);
    const form = screen.getByText('Регистрация');
    expect(form).toBeInTheDocument();
    expect(screen.getByLabelText('Ваше имя:')).toBeInTheDocument();
    expect(screen.getByLabelText('Ваш город:')).toBeInTheDocument();
    expect(screen.getByLabelText('Мужской')).toBeInTheDocument();
    expect(screen.getByLabelText('Выбрать фото')).toBeInTheDocument();
    expect(screen.getByLabelText('Согласен на обработку данных')).toBeInTheDocument();
  });

  test('render user', () => {
    renderWidthRouter(
      <User key={2} name={'Ирина'} city={'Минск'} date={'2021-04-21'} photo={''} sex={'Женский'} />,
      '/forms'
    );

    expect(screen.getByText('Ирина')).toBeInTheDocument();
    expect(screen.getByText('Минск')).toBeInTheDocument();
    expect(screen.getByText('2021-04-21')).toBeInTheDocument();
    expect(screen.getByText('Женский')).toBeInTheDocument();
  });
});

describe('actions in form', () => {
  beforeEach(() => {
    renderWidthRouter(<App />, '/forms');
  });

  test('registration button should be enabled in the beginning', () => {
    const button: HTMLButtonElement = screen.getByRole('button');

    expect(button.disabled).toBe(false);
  });

  test('input name', () => {
    const nameInput = screen.getByLabelText('Ваше имя:');
    userEvent.type(nameInput, 'Валера');
    expect(screen.getByDisplayValue('Валера')).toBeInTheDocument();
    //screen.debug();
  });

  test('choose date', async () => {
    const dateInput: HTMLInputElement = screen.getByLabelText('Дата поступления:');

    await userEvent.type(dateInput, '2000-01-01');

    expect(dateInput.value).toBe('2000-01-01');
  });

  test('choose city', async () => {
    const selectCity = screen.getByRole('combobox');

    await userEvent.selectOptions(selectCity, ['Гомель']);

    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Гомель' }).selected).toBe(true);
    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Минск' }).selected).toBe(false);
    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Брест' }).selected).toBe(false);
  });

  test('choose sex', async () => {
    const radioInput: HTMLInputElement = screen.getByLabelText('Мужской');

    await userEvent.click(radioInput);

    expect(radioInput.checked).toBe(true);
  });

  test('registration button should be enabled, and after sex chosen button should be disabled', async () => {
    const button: HTMLButtonElement = screen.getByRole('button');
    const radioInput: HTMLInputElement = screen.getByLabelText('Мужской');

    expect(button.disabled).toBe(false);

    await userEvent.click(radioInput);

    userEvent.click(button);

    expect(button.disabled).toBe(true);
  });
});
