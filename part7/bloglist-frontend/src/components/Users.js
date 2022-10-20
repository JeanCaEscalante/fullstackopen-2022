import React from 'react';
import { useSelector } from 'react-redux'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import UsersTable from './UsersTable';
const Users = () => {
    const users = useSelector((state) => state.users)
    return (
      <Container maxWidth="xs">
          <div className='paper'>
            <Typography component="h1" variant="h5">
              Users
            </Typography>
                <UsersTable users={users} />
            </div>
        </Container>
      )
}

export default Users;