import { fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { renderWidthRouter } from '../../components/tests-helpers/renderWithRouter';
import RickMorty from './RickMorty';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import { baseUrl } from '../../api/api.ts';

jest.mock('axios');

describe('render', () => {
  test('render rick-morty page', async () => {
    renderWidthRouter(<RickMorty />);
    expect(screen.getByPlaceholderText('search...')).toBeInTheDocument();
  });
});

describe('fetch rick-morty characters', () => {
  let response;

  beforeEach(() => {
    response = {
      data: {
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
            url: 'https://rickandmortyapi.com/api/character/1',
            location: { name: '' },
            created: '2017-11-04T18:48:46.250Z',
          },
          {
            id: 2,
            name: 'Morty Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male',
            origin: { name: 'unknown', url: '' },
            image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
            url: 'https://rickandmortyapi.com/api/character/2',
            location: { name: '' },
            created: '2017-11-04T18:50:21.651Z',
          },
          {
            id: 3,
            name: 'Summer Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Female',
            image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
            url: 'https://rickandmortyapi.com/api/character/3',
            location: { name: '' },
            created: '2017-11-04T19:09:56.428Z',
          },
          {
            id: 4,
            name: 'Beth Smith',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Female',
            image: 'https://rickandmortyapi.com/api/character/avatar/4.jpeg',
            url: 'https://rickandmortyapi.com/api/character/4',
            location: { name: '' },
            created: '2017-11-04T19:22:43.665Z',
          },
        ],
      },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetch characters(4+4)', async () => {
    axios.get.mockReturnValue(response);
    renderWidthRouter(<RickMorty />);
    const characters = await screen.findAllByText('Gender:');
    expect(characters.length).toBe(8);
    expect(axios.get).toBeCalledTimes(1);
  });
  test('fetch by search "ric"', async () => {
    axios.get.mockReturnValue(response);
    renderWidthRouter(<RickMorty />);
    const searchInput = screen.getByPlaceholderText('search...');
    userEvent.type(searchInput, 'ric');
    fireEvent.submit(searchInput);
    expect(axios.get).toBeCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/?name=ric`);
  });
});
