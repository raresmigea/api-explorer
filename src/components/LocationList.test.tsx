// src/components/LocationList.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_LOCATIONS } from '../graphql/queries';
import LocationList from './LocationList';

// Mock the GraphQL query
const mocks = [
  {
    request: {
      query: GET_LOCATIONS,
      variables: { page: 1 },
    },
    result: {
      data: {
        locations: {
          info: { count: 2, next: 2, prev: null },
          results: [
            {
              id: '1',
              name: 'Location 1',
              type: 'Type 1',
              dimension: 'Dimension 1',
            },
            {
              id: '2',
              name: 'Location 2',
              type: 'Type 2',
              dimension: 'Dimension 2',
            },
          ],
        },
      },
    },
  },
];

describe('LocationList', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationList />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_LOCATIONS,
          variables: { page: 1 },
        },
        error: new Error('An error occurred'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <LocationList />
      </MockedProvider>
    );

    await screen.findByText('Error: An error occurred');
  });

  it('renders locations', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationList />
      </MockedProvider>
    );

    expect(await screen.findByText('Location 1')).toBeInTheDocument();
    expect(screen.getByText('Location 2')).toBeInTheDocument();
    expect(screen.getByText('Showing 1-2 of 2 entries')).toBeInTheDocument();
  });

});
