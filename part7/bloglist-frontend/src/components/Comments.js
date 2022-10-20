import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
const Comments = () => {
    const { id } = useParams()
    const blogs = useSelector((state) => state.blogs)
    const blog = blogs.find((blog) => blog.id === id)

    return (
        <>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#f3f3f3' }}>
          {(blog.comments.length > 0) &&
            <div>
              {blog.comments.map((comment) => (
                <ListItem key={comment.id}>
                <ListItemAvatar>
                <Avatar>
                    <CommentOutlinedIcon />
                </Avatar>
                </ListItemAvatar>
                 <ListItemText primary={comment.content} />
                </ListItem>
              ))}
            </div>
          }
        </List>
        </>
      )
}

export default Comments