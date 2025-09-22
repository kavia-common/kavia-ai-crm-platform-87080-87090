import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Kavia CRM brand', () => {
  render(<App />);
  const brand = screen.getByText(/Kavia CRM/i);
  expect(brand).toBeInTheDocument();
});
