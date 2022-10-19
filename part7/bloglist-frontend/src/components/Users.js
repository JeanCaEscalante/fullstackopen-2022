import React from 'react';
import { useSelector } from 'react-redux'

import UsersTable from './UsersTable';
const Users = () => {
    const users = useSelector((state) => state.users)
    return (
        <div>
          <h2>Users</h2>
          <UsersTable users={users} />
        </div>
      )
}

export default Users;