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

const App = ({user}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAll());
    dispatch(initUsers())
  }, [dispatch])

  return (
    <>
            
      {
       !user ? (
        <>
          <LoginForm /> 
        </>)
       : (
          <Router>
          <NavBar />
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogPage />} />
              <Route path="/users/:id" element={<UserPage />} />
              <Route path="/" element={<Blogs />} />
            </Routes>
          </Router>   
        )
      } 
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
