import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import History from '../../components/history/history.js';
import React from 'react';

const testHistory = [
  {
    method:'get',
    url:'someFakeGet.com',
  },
  {
    method:'post',
    url:'someFakePost.com',
  },
];

test('it should list all history urls', ()=>{
  render(<History history={testHistory}></History>);
  const urlGetElement = screen.getByText(/someFakeGet.com/i);
  expect(urlGetElement).toBeInTheDocument();
  const urlPostElement = screen.getByText(/someFakePost.com/i);
  expect(urlPostElement).toBeInTheDocument();

})