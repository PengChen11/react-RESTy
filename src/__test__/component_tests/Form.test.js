import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Form from '../../components/form/form.js';
import React from 'react';


test('Form component tests for method selection buttons', ()=>{
  render(<Form  />);
  const getButton = screen.getByTestId('getButton');
  expect(getButton).toHaveClass('true');

  const postButton = screen.getByTestId('postButton');
  expect(postButton).toHaveClass('false');
  fireEvent.click(postButton);
  expect(postButton).toHaveClass('true');

  const putButton = screen.getByTestId('putButton');
  expect(putButton).toHaveClass('false');
  fireEvent.click(putButton);
  expect(putButton).toHaveClass('true');

  const deleteButton = screen.getByTestId('deleteButton');
  expect(deleteButton).toHaveClass('false');
  fireEvent.click(deleteButton);
  expect(deleteButton).toHaveClass('true');
});


test('Form component tests for submission with bad URL', ()=>{
  const fakeFn = jest.fn();
  render(<Form  getRequest={fakeFn}/>);

  const submitForm = document.getElementById('api');
  const urlInput = screen.getByTestId('urlInput');
  fireEvent.change(urlInput, {target: {value: 'some bad url'}});
  fireEvent.submit(submitForm);

  const urlErr = {
    request: {
      data: {},
      method: 'get',
      url: 'some bad url',
    },
    result: {'message': 'Url validation failed, please double check your url input. Full url requested, like http(s)://xxx.xxx '}};
  expect(fakeFn).toHaveBeenCalledWith(urlErr);
});

test('Form component tests for submission with bad JSON body', ()=>{
  const fakeFn = jest.fn();
  render(<Form  getRequest={fakeFn}/>);

  const submitForm = document.getElementById('api');
  const urlInput = screen.getByTestId('urlInput');
  const jsonBody = screen.getByTestId('jsonBody');
  fireEvent.change(urlInput, {target: {value: 'http://good.address'}});
  fireEvent.change(jsonBody, {target: {value: 'some bad body'}});
  fireEvent.submit(submitForm);
  
  const jsonErr = {result: {'message': 'JSON data validation failed, please double check your JSON input. Quotes needed for both keys and values'}};
  expect(fakeFn).toHaveBeenCalledWith(jsonErr);
});
