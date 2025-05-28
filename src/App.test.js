import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the Firebase initialization
jest.mock('./config/firebase', () => ({
  db: {},
}));

// Mock the profiles data
jest.mock('./data/profiles', () => ({
  initializeProfiles: jest.fn().mockResolvedValue([]),
  getAllProfiles: jest.fn().mockResolvedValue([]),
}));

test('renders Profile Mapper title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Profile Mapper/i);
  expect(titleElement).toBeInTheDocument();
});
