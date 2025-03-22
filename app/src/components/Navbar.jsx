import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { Button } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
            navigate('/login', { replace: true });
        }
    };

    return (
        <nav>
            <Link to="/">Home</Link>

            {isAuthenticated && (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/product-list">Product List</Link>
                </>
            )}

            {/*<Link to="/register" style={{ textDecoration: 'none' }}>*/}
            {/*    <Button style={{ color: 'white' }}>Register</Button>*/}
            {/*</Link>*/}

            {!isAuthenticated ? (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button style={{ color: 'white' }}>Login</Button>
                </Link>
            ) : (
                <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="secondary"
                    disabled={isLoggingOut}
                    sx={{
                        borderRadius: '8px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        fontWeight: '600',
                        boxShadow: 3,
                        '&:hover': {
                            backgroundColor: '#d32f2f',
                            boxShadow: 6,
                        },
                    }}
                >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                </Button>
            )}
        </nav>
    );
};

export default Navbar;