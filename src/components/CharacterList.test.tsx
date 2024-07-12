import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_CHARACTERS } from '../graphql/queries';
import CharacterList from './CharacterList';

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          info: { count: 2, next: 2, prev: null },
          results: [
            {
              id: '1',
              name: 'Character 1',
              species: 'Human',
              origin: { name: 'Earth' },
              location: { name: 'Galaxy' },
            },
            {
              id: '2',
              name: 'Character 2',
              species: 'Alien',
              origin: { name: 'Mars' },
              location: { name: 'Universe' },
            },
          ],
        },
      },
    },
  },
];

describe('CharacterList', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { page: 1 },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    await screen.findByText('Error: An error occurred');
  });

  it('renders characters', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    expect(await screen.findByText('Character 1')).toBeInTheDocument();
    expect(screen.getByText('Character 2')).toBeInTheDocument();
    expect(screen.getByText('Showing 1-2 of 2 entries')).toBeInTheDocument();
  });

});
