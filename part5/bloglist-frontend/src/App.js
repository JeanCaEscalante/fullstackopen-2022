import React, {useState, useEffect} from 'react';
import loginService from './service/login';
import blogService from './service/blogList';
import Notification from './component/Notification';
import BlogsForm from './component/blogsForm';
import LoginForm from './component/loginForm';
import Togglable from './component/Togglable';
import Blog from './component/Blog';
import './App.css';

// eslint-disable-next-line require-jsdoc
function App() {
  const [blogs, setBlogs] = useState([]);
  const [notify, setNotify] =useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    };
  }, []);

  useEffect(() => {
    blogService
        .getAll().then((initialBlogs) => {
          setBlogs(initialBlogs);
        });
  }, []);

  setTimeout(() => {
    setNotify({name: null});
  }, 5000);

  const Login = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setNotify({name: 'sucess', message: `${user.name} logged`});
    } catch (exception) {
      setNotify({name: 'error', message: 'Wrong credentials'});
      setTimeout(() => {
        setNotify({name: null});
      }, 5000);
    }
  };


  const addBlog = async (blogObject) => {
    try {
      const saveBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(saveBlog));
      setNotify({name: 'sucess', message: `${saveBlog} aggregate`});
    } catch (exception) {
      setNotify({name: 'error', message: exception.request.responseText});
      setTimeout(() => {
        setNotify({name: null});
      }, 5000);
    }
  };

  const updateLike = async (id, blogObject) => {
    try {
      const updateBlog = await blogService.update(id, blogObject);
      setNotify({name: 'sucess',
        message: `update blog staus: ${updateBlog.data.acknowledged}`});
    } catch (exception) {
      console.log(exception);
      setNotify({name: 'error', message: exception.request.responseText});
      setTimeout(() => {
        setNotify({name: null});
      }, 5000);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id);
      setNotify({name: 'warning',
        message: `deltete blog`});
      setBlogs(blogs.filter((item) => item.id !== id));
    } catch (exception) {
      console.log(exception);
      setNotify({name: 'error', message: exception.request.responseText});
      setTimeout(() => {
        setNotify({name: null});
      }, 5000);
    }
  };

  const logout = () => {
    if (window.confirm(`${user.name} you want to end the session?`)) {
      window.localStorage.removeItem('loggedUser');
      location. reload();
    }
  };

  return (
    <div className="split-screen">
      <section className="split-screen__half">
        <div className='container left'>
          {user === null ?
            <LoginForm session={Login} /> :
        <>
          <div className='nav'>
            <p>{user.name} logged-in  </p>
            <button type='button' onClick={logout}>logged-out</button>
          </div>
          <Togglable buttonLabel="New Blogs">
            <BlogsForm
              createBlog={addBlog}
            />
          </Togglable>
        </>
          }
        </div>
      </section>
      <section className="split-screen__half">
        <div className='container right'>
          <h2>blogs</h2>
          <div className="accordion">
            { user &&
              blogs.map((blog) =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  userLogged={user ? user.name : null}
                  update={updateLike} remove={deleteBlog}/> )
            }
          </div>
        </div>
      </section>
      <Notification notification={notify} />
    </div>);
}


export default App;
