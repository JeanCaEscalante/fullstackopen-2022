import React, {useState} from 'react';
import PropTypes from 'prop-types';

const Blog = ({blog, update, remove, userLogged}) => {
  const [visible, setVisible] = useState(false);
  const [like, setLike] = useState(blog.likes);
  const hideWhenVisible = visible ?
                    'accordion__item--expanded' : 'accordion__item--collapsed';

  const visibility = () => {
    setVisible(!visible);
  };

  const newLike = () => {
    setLike(like + 1);
    update(blog.id, {likes1: like});
  };

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${title} by${author}?`)) {
      remove(blog.id);
    }
  };

  return (
    <>
      <div className={`accordion__item ${hideWhenVisible}`}>
        <div className="accordion__header">
          <div className="accordion__title">
            {blog.title}
          </div>
          <div className="accordion__toggle">
            <button className='btn-ico'
              aria-label="view" id='view' onClick={visibility}>
              {visible ?
                    <span className='material-symbols-outlined'>
                      close
                    </span> :
                    <span className='material-symbols-outlined'>
                      add
                    </span>
              }

            </button>
          </div>
        </div>
        {visible &&
        <div className="accordion__content">
          <p aria-label="author">author: {blog.author}</p>
          <p aria-label="url">url: <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0]}</a></p>
          <p aria-label="like">likes: {like}</p>
          <button id='like' onClick={newLike}>Like</button>
          <p aria-label="user">user: {blog.user.name}</p>
          {blog.user.name === userLogged &&
            <button id='remove' className='btn danger' onClick={deleteBlog}>
              Eliminar
            </button> }
        </div>}
      </div>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  userLogged: PropTypes.string,
  update: PropTypes.func,
  remove: PropTypes.func,
};

export default Blog;
