import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link } from 'react-router-dom'

export default function UsersTable({users}) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Users</TableCell>
            <TableCell align="right">Blog Create</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><Link to={user.id}>{user.name}</Link></TableCell>
              <TableCell align="right">{user.blogs?.length || 0 }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
  );
}
