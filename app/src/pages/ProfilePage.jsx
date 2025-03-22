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
    CircularProgress
} from '@mui/material';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const { user } = useSelector(state => state.auth);
    console.log(user);
    const userId = user?._id;
    // Query and mutations
    const { data: profile, isLoading, isError, error } = useGetProfileQuery(userId);
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
    const [showPassword, setShowPassword] = useState(false);

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

            if (profile.avatar) {
                setPreviewUrl(profile.avatar);
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

        // Create preview URL
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

                formDataToSend.append('file', selectedFile);
                formDataToSend.append('userId', userId);
                await updateProfileWithAvatar(formDataToSend).unwrap();
            } else {
                const dataToSend = { ...formData };
                dataToSend.userId = userId;
                console.log(dataToSend);

                if (!dataToSend.password) {
                    delete dataToSend.password;
                }

                await updateProfile(dataToSend).unwrap();
            }

            // Clear password field after successful update
            setFormData(prev => ({ ...prev, password: '' }));
            setSelectedFile(null);

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
                    {/* Avatar with styling to indicate it's clickable */}
                    <Avatar
                        src={previewUrl}
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
                            mb: 1
                        }}
                        onClick={handleAvatarClick}
                    />

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAvatarClick}
                        sx={{ mt: 1 }}
                    >
                        Change Photo
                    </Button>

                    <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileSelect}
                    />
                </Box>

                <form onSubmit={handleSubmit}>
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