import React from 'react';
import { useSelector } from 'react-redux'
import BlogsTable from './BlogsTable';
import BlogForm from './BlogForm';

const Blogs = () => {
const blogs = useSelector((state) => state.blogs)
  return (
      <div className="split-screen">
        <div className="split-screen__half">
          <BlogForm />
        </div>
        <div className="split-screen__half">
          <BlogsTable blogs={blogs} />
        </div>
      </div>)
}

export default Blogs
