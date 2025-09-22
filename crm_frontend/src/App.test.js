import { render, screen } from '@testing-library/react';
import App from './App';

// The brand appears in the sidebar component
test('renders Kavia CRM brand', () => {
  render(<App />);
  const brand = screen.getByText(/Kavia CRM/i);
  expect(brand).toBeInTheDocument();
});
