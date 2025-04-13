import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLogoutMutation } from '../../features/auth/authApiSlice.js';
import {
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    Typography,
    Divider
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { API_BASE_URL } from '../../utils/constant.js';
// const API_BASE_URL = 'http://localhost:5000';

const UserMenu = () => {
    const navigate = useNavigate();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
    const user = useSelector((state) => state.auth.user);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    // Get user's first initial or display image if available
    const getAvatarContent = () => {
        if (user?.avatar && user.avatar !== "") {
            // Combine the base URL with the avatar path
            const fullAvatarUrl = `${API_BASE_URL}${user.avatar}`;
            return <Avatar src={fullAvatarUrl} alt={user.name} />;
        } else if (user?.name) {
            // If no avatar, use the first letter of the user's name
            return <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>;
        } else if (user?.email) {
            // Fallback to email initial if no name
            return <Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>;
        } else {
            return <Avatar>U</Avatar>;
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            handleClose();
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
            handleClose();
            navigate('/', { replace: true });
        }
    };

    return (
        <div>
            <IconButton
                onClick={handleClick}
                size="small"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ p: 0 }}
            >
                {getAvatarContent()}
            </IconButton>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'user-button',
                }}
                PaperProps={{
                    elevation: 4,
                    sx: {
                        minWidth: 180,
                        mt: 1.5,
                    },
                }}
            >
                {user?.name && (
                    <MenuItem disabled>
                        <Typography variant="body2">
                            Signed in as <strong>{user.name}</strong>
                        </Typography>
                    </MenuItem>
                )}
                <Divider />
                <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>
                    Profile
                </MenuItem>
                <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                </MenuItem>
            </Menu>
        </div>
    );
};

export default UserMenu;