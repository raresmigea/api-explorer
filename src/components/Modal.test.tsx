// src/components/Modal.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  it('renders modal content', () => {
    render(
      <Modal onClose={() => {}}>
        <h2>Modal Content</h2>
        <p>Some text inside the modal.</p>
      </Modal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
    expect(screen.getByText('Some text inside the modal.')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const onCloseMock = jest.fn();

    render(
      <Modal onClose={onCloseMock}>
        <h2>Modal Content</h2>
        <p>Some text inside the modal.</p>
      </Modal>
    );

    const closeButton = screen.getByText('x');
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
