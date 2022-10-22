import React from 'react';
import { login } from '../reducers/loginReducer';
import { useDispatch } from 'react-redux';
import {useField} from '../hooks/useField'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const LoginForm = () => {
  const dispatch = useDispatch()
  const username = useField('text');
  const password = useField('password');


  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const user = {
        username: username.value,
        password: password.value
      }
      
      await dispatch(login(user))

    } catch (error) {
      const notification = {
        type: 'notifications/error',
        text: error.response.data.error,
      }

      console.log(error)
      dispatch(notification)
      setTimeout(() => {
        dispatch({ type: 'notifications/timeout', text: '' })
      }, 5000)
    }
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

export default LoginForm;