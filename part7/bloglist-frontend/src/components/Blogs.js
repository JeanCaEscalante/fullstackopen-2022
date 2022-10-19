import React from 'react';
import { useSelector } from 'react-redux'
import BlogsTable from './BlogsTable';
import BlogForm from './BlogForm';

const Blogs = () => {
const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <h2>blogs</h2>
      <BlogForm />
      <BlogsTable blogs={blogs} />
    </div>
  )
}

export default Blogs
