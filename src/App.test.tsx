import { render, screen } from '@testing-library/react';
import App from './App';

test('renders book shop', () => {
  render(<App />);
  const linkElement = screen.getByText(/book store/i);
  expect(linkElement).toBeInTheDocument();
});
