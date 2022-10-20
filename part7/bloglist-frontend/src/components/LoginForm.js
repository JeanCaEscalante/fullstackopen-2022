import React from 'react';
import { connect } from 'react-redux';
import { login } from '../reducers/loginReducer';

import {useField} from '../hooks/useField'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const LoginForm = (props) => {

  const username = useField('text');
  const password = useField('password');


  const addBlog = (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value
    }
    props.login(user);
  };

  return (
    <form className='form-login' id='blog-form' onSubmit={addBlog}>
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...username}
            label="Username"
          />
      <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            {...password}
            label="Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className='button-login'
          >
            Sign In
          </Button>
    </form>);
};

export default connect(
  null, 
  { login }
)(LoginForm)