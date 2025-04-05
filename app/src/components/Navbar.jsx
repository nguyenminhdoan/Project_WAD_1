import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import  UserMenu  from './userMenu/UserMenu';

const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <nav>
            <Link to="/">Home</Link>

            {isAuthenticated && (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                    {/*<Link to="/profile">Profile</Link>*/}
                    <Link to="/product-list">Product List</Link>
                </>
            )}

            {!isAuthenticated ? (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <Button style={{ color: 'white' }}>Login</Button>
                </Link>
            ) : (
                <UserMenu />
            )}
        </nav>
    );
};

export default Navbar;