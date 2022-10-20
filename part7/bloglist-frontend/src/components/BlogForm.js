import React from 'react';
import {useField} from '../hooks/useField';
import { connect } from 'react-redux';
import { newBlog } from '../reducers/blogsReducer';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    <>
    <h2>Create New</h2>
    <form className='form' id='blog-form' onSubmit={addBlog} onReset={reset}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...title}
            label="Title"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...author}
            label="Author"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...url}
            label="URL"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...likes}
            label="Likes"
          />
      <div>
        <Button variant="contained" className='btn' color="success" type="submit">Save</Button>
        <Button variant="contained" className='btn' type="reset">Reset</Button>
      </div>
    </form>
    </>);
};

export default connect(
  null, 
  { newBlog }
)(BlogsForm)

