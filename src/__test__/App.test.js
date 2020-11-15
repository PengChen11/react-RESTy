import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import React from 'react';
import Home from '../pages/home';

test.skip('renders Header', () => {
  render(<Home />);
  const titleElement = screen.getByText(/RESTy/i);
  expect(titleElement).toBeInTheDocument(); //toHaveTextContent('something')
});

test.skip('renders form buttons', () => {
  render(<App />);
  const urlElement = screen.getByText(/URL:/i);
  expect(urlElement).toBeInTheDocument(); 
  const goButton = screen.getByText(/GO!/i);
  expect(goButton).toBeInTheDocument();
  const getButton = screen.getByText(/GET/i);
  expect(getButton).toBeInTheDocument(); 
  const postButton = screen.getByText(/POST/i);
  expect(postButton).toBeInTheDocument(); 
  const putButton = screen.getByText(/PUT/i);
  expect(putButton).toBeInTheDocument(); 
  const deleteButton = screen.getByText(/DELETE/i);
  expect(deleteButton).toBeInTheDocument(); 
});

test.skip('do NOT renders history when no requests is made yet', () => {
  render(<App />);
  const historyElement = screen.queryByText(/History/i);
  expect(historyElement).not.toBeInTheDocument(); 
});

test.skip('do NOT renders result when no requests is made yet', () => {
  render(<App />);
  const resultHeaders = screen.queryByText(/Headers/i);
  expect(resultHeaders).not.toBeInTheDocument(); 
  const resultData = screen.queryByText(/data/i);
  expect(resultData).not.toBeInTheDocument();
});

test.skip(' renders footer', () =>{
  render(<App />);
  const footerElement = screen.getByText(/Code Fellows/i);
  expect(footerElement).toBeInTheDocument(); 
});

