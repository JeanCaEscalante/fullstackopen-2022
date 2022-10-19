import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLikeOf, toggleDeleteOf} from '../reducers/blogsReducer'

 const BlogPage = () => {
    const blogs = useSelector((state) => state.blogs)
    const nav = useNavigate();
    const dispatch = useDispatch()
    const { id } = useParams()
    const blog = blogs.find((blog) => blog.id === id)
  
    const like = (element) => {
        const updateLike = {...element, likes: element.likes + 1}
        dispatch(toggleLikeOf(element.id, updateLike));
    }

    const remove = () => {
        if(window.confirm(`Deleted ${blog.title}?`)){
            dispatch(toggleDeleteOf(blog.id));
            nav('/blogs');
        }
    }

    return (
        <>
        <h6>title: {blog.title}</h6>
        <h6>author: {blog.author}</h6>
        <h6>url: {blog.url}</h6>
        <h6>likes: {blog.likes}  <button  onClick={() => like(blog)}>Like</button>  </h6>  
        <button onClick={() => remove()}>Delete</button>
        </>
    )
}

export default BlogPage;