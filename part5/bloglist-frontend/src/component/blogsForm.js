import React, {useState} from 'react';
import PropTypes from 'prop-types';

const BlogsForm = ({createBlog}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title1: title,
      author1: author,
      url1: url,
      likes1: likes,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
  };

  return (
    <form className='form' id='blog-form' onSubmit={addBlog}>
      <div className="group">
        <input
          type="text"
          id='title'
          placeholder="Title"
          value={title}
          onChange={({target}) => setTitle(target.value)}/>
      </div>
      <div className="group">
        <input
          type="text"
          id='author'
          placeholder="Author"
          value={author}
          onChange={({target}) => setAuthor(target.value)}/>
      </div>
      <div className="group">
        <input
          type="text"
          id='url'
          placeholder="Url"
          value={url}
          onChange={({target}) => setUrl(target.value)}/>
      </div>
      <div className="group">
        <input
          type="text"
          id='likes'
          placeholder="Likes"
          value={likes}
          onChange={({target}) => setLikes(target.value)}/>
      </div>
      <div>
        <button id='guardar' className='btn' type="submit">Save</button>
      </div>
    </form>);
};

BlogsForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};
export default BlogsForm;
