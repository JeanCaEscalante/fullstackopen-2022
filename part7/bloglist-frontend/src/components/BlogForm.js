import React from 'react';
import {useField} from '../hooks/useField';
import { connect } from 'react-redux';
import { newBlog } from '../reducers/blogsReducer';

const BlogsForm = (props) => {

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');
  const likes = useField('text');


  const addBlog = (event) => {
    event.preventDefault();

    const Blog = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: likes.value
    }

    props.newBlog(Blog)

    reset();
  };

  const reset = (event) => {
    event.preventDefault();

    title.onReset();
    author.onReset();
    url.onReset();
    likes.onReset();

  }

  return (
    <form className='form' id='blog-form' onSubmit={addBlog} onReset={reset}>
      <div className="group">
        <input {...title}/>
      </div>
      <div className="group">
        <input {...author}/>
      </div>
      <div className="group">
        <input {...url}/>
      </div>
      <div className="group">
        <input {...likes}/>
      </div>
      <div>
        <button id='guardar' className='btn' type="submit">Save</button>
        <button type="reset">Reset</button>
      </div>
    </form>);
};

export default connect(
  null, 
  { newBlog }
)(BlogsForm)

