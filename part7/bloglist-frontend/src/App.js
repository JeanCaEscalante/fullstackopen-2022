import { useEffect } from 'react'
import { useDispatch, connect } from 'react-redux';
import { initAll } from './reducers/blogsReducer';

import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

const App = ({user}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAll());
  }, [dispatch])

  return (
    <>
            
      {
       (user === null) ? <LoginForm /> : <BlogForm />
      }      
      <BlogList />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
