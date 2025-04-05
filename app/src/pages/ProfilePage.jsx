import React, { useState, useEffect, useRef } from 'react';
import {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateProfileWithAvatarMutation,
    selectUpdateSuccess,
    clearUpdateSuccess
} from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Avatar,
    Grid,
    Snackbar,
    Alert,
    CircularProgress,
    Dialog,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Define the base URL for your backend server
const API_BASE_URL = 'http://localhost:5000';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { user } = useSelector(state => state.auth);
    const userId = user?._id;

    // Query and mutations
    const { data: profile, isLoading, isError, error } = useGetProfileQuery(userId);
    console.log(profile);
    const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();
    const [updateProfileWithAvatar, { isLoading: isUpdatingWithAvatar }] = useUpdateProfileWithAvatarMutation();

    // Local state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);
    const [avatarLoading, setAvatarLoading] = useState(true);

    // Get success state from Redux
    const updateSuccess = useSelector(selectUpdateSuccess);

    // Set form data when profile is loaded
    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || '',
                email: profile.email || '',
                password: ''
            });

            // If profile has an avatar, set the full URL
            if (profile.avatar) {
                const fullAvatarUrl = `${API_BASE_URL}${profile.avatar}`;
                setAvatarUrl(fullAvatarUrl);
                setPreviewUrl(''); // Clear any previously selected file preview
                setAvatarLoading(true);
            } else {
                setAvatarUrl('');
                setPreviewUrl('');
                setAvatarLoading(false);
            }
        }
    }, [profile]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle file selection
    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setAvatarLoading(true);
        setAvatarUrl(''); // Clear the backend avatar URL when a new file is selected

        // Create preview URL for the selected file
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    };

    // Open file dialog
    const handleAvatarClick = () => {
        fileInputRef.current.click();
    };

    // Handle image load completed (success or error)
    const handleAvatarLoaded = () => {
        setAvatarLoading(false);
    };

    // Handle image error
    const handleAvatarError = () => {
        setAvatarLoading(false);
        // Fallback to empty for avatar display
        if (avatarUrl) {
            console.error('Failed to load avatar from:', avatarUrl);
            setAvatarUrl('');
        }
        if (previewUrl) {
            console.error('Failed to load preview');
            setPreviewUrl('');
        }
    };

    // Open full-size avatar view
    const handleViewFullAvatar = (e) => {
        e.stopPropagation(); // Prevent triggering file input click
        if (avatarUrl || previewUrl) {
            setShowFullImage(true);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // If there's a file, use the multipart endpoint
            if (selectedFile) {
                const formDataToSend = new FormData();
                formDataToSend.append('name', formData.name);
                formDataToSend.append('email', formData.email);

                // Only include password if it's provided
                if (formData.password) {
                    formDataToSend.append('password', formData.password);
                }

                formDataToSend.append('avatar', selectedFile);
                formDataToSend.append('userId', userId);

                await updateProfileWithAvatar(formDataToSend).unwrap();
            } else {
                const dataToSend = { ...formData };
                dataToSend.userId = userId;

                if (!dataToSend.password) {
                    delete dataToSend.password;
                }

                await updateProfile(dataToSend).unwrap();
            }

            // Clear password field after successful update
            setFormData(prev => ({ ...prev, password: '' }));
            setSelectedFile(null);
            setPreviewUrl('');
            // Avatar URL will be updated when profile is refetched

        } catch (err) {
            console.error('Error updating profile:', err);
            if (err.status === 'PARSING_ERROR') {
                console.error('Response was not valid JSON. Backend error:', err.error);
            }
        }
    };

    // Close success alert
    const handleCloseAlert = () => {
        dispatch(clearUpdateSuccess());
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box m={3}>
                <Alert severity="error">
                    Error loading profile: {error?.data?.message || 'Unknown error'}
                </Alert>
            </Box>
        );
    }

    // Determine which avatar source to use - either the new preview or the existing avatar
    const displayedAvatar = previewUrl || avatarUrl;
    const hasAvatar = Boolean(displayedAvatar);

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', my: 4, px: 2 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    My Profile
                </Typography>

                <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    mb={4}
                    mt={2}
                >
                    {/* Avatar container */}
                    <Box position="relative" sx={{ mb: 1 }}>
                        {/* Loading overlay */}
                        {avatarLoading && hasAvatar && (
                            <Box
                                position="absolute"
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                zIndex={1}
                                top={0}
                                left={0}
                                right={0}
                                bottom={0}
                            >
                                <CircularProgress size={40} />
                            </Box>
                        )}

                        {/* Avatar */}
                        <Avatar
                            src={displayedAvatar}
                            alt={formData.name || 'User Avatar'}
                            sx={{
                                width: 120,
                                height: 120,
                                cursor: 'pointer',
                                '&:hover': {
                                    opacity: 0.8,
                                    boxShadow: '0 0 0 4px rgba(25, 118, 210, 0.3)'
                                },
                                transition: 'all 0.2s',
                                bgcolor: hasAvatar ? 'transparent' : 'primary.main',
                            }}
                            onClick={handleAvatarClick}
                            onLoad={handleAvatarLoaded}
                            onError={handleAvatarError}
                        >
                            {!hasAvatar && formData.name ? formData.name.charAt(0).toUpperCase() : ''}
                        </Avatar>

                        {/* View full image button (only shown when hovering and avatar exists) */}
                        {hasAvatar && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    opacity: 0,
                                    transition: 'opacity 0.2s',
                                    '&:hover': {
                                        opacity: 1
                                    },
                                    pointerEvents: 'none' // Prevents blocking clicks on the avatar
                                }}
                            >
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleViewFullAvatar}
                                    sx={{
                                        minWidth: 'unset',
                                        py: 0.5,
                                        px: 1,
                                        bgcolor: 'rgba(0,0,0,0.6)',
                                        '&:hover': {
                                            bgcolor: 'rgba(0,0,0,0.8)'
                                        },
                                        pointerEvents: 'auto' // Enables click on this button
                                    }}
                                >
                                    View
                                </Button>
                            </Box>
                        )}
                    </Box>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAvatarClick}
                        sx={{ mt: 1 }}
                    >
                        {hasAvatar ? 'Change Photo' : 'Upload Photo'}
                    </Button>

                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                </Box>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email Address"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formData.password}
                                onChange={handleChange}
                                variant="outlined"
                                helperText="Leave empty if you don't want to change your password"
                                InputProps={{
                                    endAdornment: (
                                        <Button
                                            onClick={() => setShowPassword(!showPassword)}
                                            variant="text"
                                            size="small"
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </Button>
                                    ),
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} display="flex" justifyContent="center" mt={2}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isUpdating || isUpdatingWithAvatar}
                                size="large"
                                sx={{ minWidth: 200, py: 1.5 }}
                            >
                                {(isUpdating || isUpdatingWithAvatar) ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : 'Update Profile'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Full-size avatar dialog */}
            <Dialog
                open={showFullImage}
                onClose={() => setShowFullImage(false)}
                maxWidth="md"
            >
                <Box position="relative">
                    <IconButton
                        onClick={() => setShowFullImage(false)}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: 'white',
                            bgcolor: 'rgba(0,0,0,0.5)',
                            '&:hover': {
                                bgcolor: 'rgba(0,0,0,0.7)',
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={displayedAvatar}
                        alt={formData.name || 'Profile'}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '80vh',
                            display: 'block'
                        }}
                    />
                </Box>
            </Dialog>

            <Snackbar
                open={updateSuccess}
                autoHideDuration={6000}
                onClose={handleCloseAlert}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseAlert}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Profile updated successfully!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ProfilePage;