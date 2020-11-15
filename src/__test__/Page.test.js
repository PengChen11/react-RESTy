import React from 'react';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { render, fireEvent, waitFor, screen } from '@testing-library/react';

// add custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
// the component to test
import App from '../App';

const server = setupServer(
  rest.get('/', (req, res, ctx) => {
    return res(ctx.json({ name: 'hello there' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


test.skip('loads and displays Home page', async () => {
  render(<App url="/" />);
  const titleElement = screen.getByText(/RESTy/i);
  expect(titleElement).toBeInTheDocument();
});
