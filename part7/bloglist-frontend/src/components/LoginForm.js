import React from 'react';
import { connect } from 'react-redux';
import { login } from '../reducers/loginReducer';

import {useField} from '../hooks/useField'


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
    <form className='form' id='blog-form' onSubmit={addBlog}>
      <div className="group">
        <input {...username}/>
      </div>
      <div className="group">
        <input {...password}/>
      </div>
      <div>
        <button id='guardar' className='btn' type="submit">Save</button>
      </div>
    </form>);
};

export default connect(
  null, 
  { login }
)(LoginForm)