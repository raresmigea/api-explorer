import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_EPISODES } from '../graphql/queries';
import EpisodeList from './EpisodeList';

const mocks = [
  {
    request: {
      query: GET_EPISODES,
      variables: { page: 1 },
    },
    result: {
      data: {
        episodes: {
          info: { count: 2, next: 2, prev: null },
          results: [
            {
              id: '1',
              name: 'Episode 1',
              episode: 'S01E01',
              air_date: '2023-01-01',
            },
            {
              id: '2',
              name: 'Episode 2',
              episode: 'S01E02',
              air_date: '2023-01-08',
            },
          ],
        },
      },
    },
  },
];

describe('EpisodeList', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EpisodeList />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_EPISODES,
          variables: { page: 1 },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <EpisodeList />
      </MockedProvider>
    );

    await screen.findByText('Error: An error occurred');
  });

  it('renders episodes', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EpisodeList />
      </MockedProvider>
    );

    expect(await screen.findByText('Episode 1')).toBeInTheDocument();
    expect(screen.getByText('Episode 2')).toBeInTheDocument();
    expect(screen.getByText('Showing 1-2 of 2 entries')).toBeInTheDocument();
  });
});
