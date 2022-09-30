import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogsForm from './blogsForm';

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn();

  const component = render(<BlogsForm createBlog={addBlog} />);

  const title = component.container.querySelector('#title');
  const author = component.container.querySelector('#author');
  const url = component.container.querySelector('#url');
  const likes = component.container.querySelector('#likes');

  const form = component.container.querySelector('form');

  fireEvent.change(title, {target: {value: 'Go To Statement'}});
  fireEvent.change(author, {target: {value: 'Edsger W. Dijkstra'}});
  fireEvent.change(url, {target: {value: 'https://github.com/'}});
  fireEvent.change(likes, {target: {value: 10}});

  fireEvent.submit(form);

  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title1).toBe('Go To Statement');
  expect(addBlog.mock.calls[0][0].author1).toBe('Edsger W. Dijkstra');
  expect(addBlog.mock.calls[0][0].url1).toBe('https://github.com/');
  expect(addBlog.mock.calls[0][0].likes1).toBe('10');
});
