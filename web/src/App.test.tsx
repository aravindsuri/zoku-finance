import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Zoku Finance text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Zoku Finance/i);
  expect(linkElement).toBeInTheDocument();
}); 