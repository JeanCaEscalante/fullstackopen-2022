import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import Blog from './Blog';

const blog = {
  title: 'Go To Statement',
  author: 'Edsger W. Dijkstra',
  url: 'https://github.com/',
  likes: 10,
  user: {
    name: 'Jean C',
  },
};

describe('<Blog />', () => {
  test('renders blog', () => {
    const component = render(<Blog blog={blog} userLogged={{name: ''}}/>);

    const div = component.container.querySelector('.accordion__item');

    expect(div).toHaveTextContent('Go To Statement');
    // expect(div).toHaveTextContent('Edsger W. Dijkstra');
    expect(div).not.toHaveTextContent('https://github.com/');
    expect(div).not.toHaveTextContent(10);
  });

  test('renders content url and like', () => {
    const component = render(<Blog blog={blog} userLogged={{name: ''}}/>);

    const viewButton = component.getByLabelText('view');
    fireEvent.click(viewButton);

    expect(component.getByLabelText('url')).toHaveTextContent('github.com');
    expect(component.getByLabelText('like')).toHaveTextContent(10);
  });

  test('clicking the button calls event handler update', () => {
    const mockHandler = jest.fn();
    const component = render(
        <Blog blog={blog} update={mockHandler}
          userLogged={{name: 'Jean C'}} />);

    const viewButton = component.getByLabelText('view');
    fireEvent.click(viewButton);

    const button = component.getByText('Like');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
