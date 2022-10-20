import { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { initAll } from './reducers/blogsReducer';
import { initUsers } from './reducers/usersReducer';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Blogs from './components/Blogs';
import BlogPage from './components/BlogPage';
import NavBar from './components/NavBar';
import LoginForm from './components/LoginForm';
import UserPage from './components/UserPage';
import Users from './components/Users';

import blogService from './services/blogs';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './App.css';

const App = ({user}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAll());
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
    };
  }, []);
  return (
    <>
      {
       !user ? (
        <Container maxWidth="xs">
          <div className='paper'>
            <Avatar sx={{ backgroundColor: '#9c27b0', margin: '8px'}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
                <LoginForm /> 
            </div>
          </Container>)
       : (
          <Router>
          <NavBar />
          <Container maxWidth="xl">
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogPage />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/" element={<Blogs />} />
            </Routes>
          </Container>
          </Router>   
        )
      } 
  </>)
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
