import { connect  } from 'react-redux'
import { logout } from '../reducers/loginReducer';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const User = ({user, logout}) => {

    return (
      <Box sx={{ flexGrow: 0, display: 'flex' }}>
        <Typography
            variant="h6"
            sx={{
              mr: 2,
              fontFamily: 'monospace',
              fontWeight: 400,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {user && user.name}
          </Typography>
        <Button color="inherit" onClick={() => logout()}>logout</Button>
      </Box>
    )
}

const mapStateToProps = (state) => {
    return {
      user: state.user
    }
}

const mapDispatchToProps = {
  logout, 
}

export default connect(mapStateToProps,mapDispatchToProps)(User);