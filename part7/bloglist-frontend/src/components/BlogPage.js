import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toggleLikeOf, toggleDeleteOf} from '../reducers/blogsReducer'

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Comments from './Comments';
import CommentForm from './CommentForm';
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

    const isVisible = () => {
        const logged = JSON.parse(window.localStorage.getItem('user'));
        if (logged.username === blog.user.username) {
            return (<Button fullWidth variant="contained" color="error" className='button-login' onClick={() => remove()}>
                Delete
            </Button>)
        };
    }
    return (
        <Container maxWidth="md">
            <div className='paper'>
            <Box sx={{ minWidth: 400 }}>
                <Card variant="outlined" sx={{ padding: '1rem' }}>
                    <Typography component="h4">Title: {blog.title}</Typography>
                    <Typography component="h4">Author: {blog.author}</Typography>
                    <Typography component="h4">Url: {blog.url}</Typography>
                    <Typography component="h4">
                        Likes: {blog.likes} 
                        <IconButton color="primary" onClick={() => like(blog)} aria-label="like">
                            <ThumbUpOffAltIcon />
                        </IconButton>
                     </Typography>
                    {isVisible()}
                </Card>
            </Box>
            <CommentForm />
            <Comments />
            </div>
        </Container>
    )
}

export default BlogPage;