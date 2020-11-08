import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import React from 'react';

test('renders Header', () => {
  render(<App />);
  const titleElement = screen.getByText(/RESTy/i);
  expect(titleElement).toBeInTheDocument(); //toHaveTextContent('something')
});

test('renders form buttons', () => {
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

test('renders history', () => {
  render(<App />);
  const historyElement = screen.getByText(/History/i);
  expect(historyElement).toBeInTheDocument(); 
});

test('renders result', () => {
  render(<App />);
  const resultHeaders = screen.getByText(/Headers/i);
  expect(resultHeaders).toBeInTheDocument(); 
  const resultData = screen.getByText(/data/i);
  expect(resultData).toBeInTheDocument();
});

test (' renders footer', () =>{
  render(<App />);
  const footerElement = screen.getByText(/Code Fellows/i);
  expect(footerElement).toBeInTheDocument(); 
});

