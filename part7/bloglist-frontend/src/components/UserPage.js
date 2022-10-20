import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';

 const UserPage = () => {
    const users = useSelector((state) => state.users)
    const { id } = useParams()
    const user = users.find((user) => user.id === id)
  
    return (
        <Container maxWidth="xs">
        <div className='paper'>
          <Typography component="h1" variant="h5">
            {user.name}
          </Typography>
          <Typography component="h6">Added Blogs</Typography>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#f3f3f3' }}>
          {user.blogs.map((blog) => {
            return(<ListItem key={blog.id}>
                <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                </ListItemAvatar>
                 <ListItemText primary={blog.title} />
            </ListItem>)}
            )}
           </List>
          </div>
      </Container>
    )
}

export default UserPage;