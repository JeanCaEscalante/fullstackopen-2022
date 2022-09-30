import React, {useState} from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({session}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    session({username, password});
    setUsername('');
    setPassword('');
  };

  return (
    <form className='form' id='login-form' onSubmit={handleLogin}>
      <div className="group">
        <input type="text"
          value={username}
          name="Username"
          id='username'
          placeholder='Username'
          onChange={({target}) => setUsername(target.value)}/>
      </div>
      <div className="group">
        <input
          type="password"
          value={password}
          name="Password"
          id='password'
          placeholder='password'
          onChange={({target}) => setPassword(target.value)}/>
      </div>
      <div>
        <button id="login-button" className='btn' type="submit">login</button>
      </div>
    </form>);
};

LoginForm.propTypes = {
  session: PropTypes.func.isRequired,
};

export default LoginForm;
