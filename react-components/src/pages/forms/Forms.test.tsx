import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('registration button should be disabled in the beginning', () => {
    const button: HTMLButtonElement = screen.getByText('Зарегистрироваться');

    expect(button.disabled).toBe(true);
  });

  test('input name', () => {
    const nameInput = screen.getByLabelText('Ваше имя:');
    userEvent.type(nameInput, 'Валера');
    expect(screen.getByDisplayValue('Валера')).toBeInTheDocument();
  });

  test('choose date', async () => {
    const dateInput: HTMLInputElement = screen.getByLabelText('Дата поступления:');

    await userEvent.type(dateInput, '2000-01-01');

    expect(dateInput.value).toBe('2000-01-01');
  });

  test('choose city', () => {
    const selectCity = screen.getByRole('combobox');

    userEvent.selectOptions(selectCity, ['Гомель']);

    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Гомель' }).selected).toBe(true);
    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Минск' }).selected).toBe(false);
    expect(screen.getByRole<HTMLOptionElement>('option', { name: 'Брест' }).selected).toBe(false);
  });

  test('choose sex', () => {
    const radioInput: HTMLInputElement = screen.getByLabelText('Мужской');

    userEvent.click(radioInput);

    expect(radioInput.checked).toBe(true);
  });

  test('registration button should be disabled, after sex chosen button should be enabled', async () => {
    userEvent.click(screen.getByText(/about us/i));
    userEvent.click(screen.getByText(/forms/i));

    const button: HTMLButtonElement = screen.getByText('Зарегистрироваться');
    const radioInput: HTMLInputElement = screen.getByLabelText('Женский');

    expect(button.disabled).toBe(true);

    userEvent.click(radioInput);
    expect(button.disabled).toBe(false);
  });
});
