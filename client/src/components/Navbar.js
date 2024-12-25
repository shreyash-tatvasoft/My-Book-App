import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
const Navbar = () => {
  return <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant='h5' component="div" sx={{ flexGrow: 1 }}>
            <Link style={{ textDecoration : "none", color: "#fff", fontWeight : "bold"}} to={"/"}>
              Book-Shop
            </Link>
          </Typography>

          <Button component={NavLink} to='/' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Home</Button>

          <Button component={NavLink} to='/contact' style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>Contact</Button>

          <Button component={NavLink} to={ localStorage.getItem("token") ? '/dashboard' :'/login'} style={({ isActive }) => { return { backgroundColor: isActive ? '#6d1b7b' : '' } }} sx={{ color: 'white', textTransform: 'none' }}>
            {localStorage.getItem("token") ? "Profile" : "Login/Signup"}
          </Button>

        </Toolbar>
      </AppBar>
    </Box>
  </>;
};

export default Navbar;
