import { connect  } from 'react-redux'
import Blog from './Blog'


const BlogList = ({blogs, user}) => {

  return (
    <div>
      <h2>blogs</h2>
      <h3>user: {user && user.name}</h3>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const blogConect = connect(mapStateToProps)(BlogList);
export default blogConect
