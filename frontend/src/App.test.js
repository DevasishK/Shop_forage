import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ShopForge header', () => {
  render(<App />);
  const brand = screen.getByText(/ShopForge/i);
  expect(brand).toBeInTheDocument();
});
