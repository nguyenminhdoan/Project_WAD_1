import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Logo from '../assets/bugbustersLogo.jpeg'; 

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth); // Get user state

    return (
        <AppBar position="sticky">
            <Toolbar>
                {/* Logo kısmı */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Logo} alt="Logo" style={{ height: 40, marginRight: 10 }} />
                    <Typography variant="h6" component="div">
                        My Application
                    </Typography>
                </Box>
                
                {/* Linkler ve Butonlar */}
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to="/" style={{ textDecoration: 'none'}}>
                        <Button style={{color: 'white' }}>Home</Button>
                    </Link>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                        <Button style={{color: 'white' }} >Dashboard</Button> 
                    </Link>

                    {user ? (
                        <Button style={{ textDecoration: 'none',color: 'white' }}  onClick={() => dispatch(logout())}> 
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button style={{color: 'white' }} >Login</Button>
                            </Link>
                            <Link to="/register" style={{ textDecoration: 'none'}}>
                                <Button style={{color: 'white' }}>Register</Button> 
                            </Link>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
