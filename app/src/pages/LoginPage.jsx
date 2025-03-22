import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../features/auth/authApiSlice';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const location = useLocation();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const from = location.state?.from?.pathname || '/';


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData).unwrap();
      navigate(from, { replace: true });
    } catch (err) {
      // Error handling
    }
  };


  return (
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>

          {error && (
              <Alert severity="error">
                {error.data?.message || 'An error occurred during login'}
              </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
                label="E-mail"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                type="email"
                required
            />

            <TextField
                label="Password"
                name="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formData.password}
                onChange={handleChange}
                type="password"
                required
            />

            <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                disabled={isLoading}
                sx={{ mt: 2 }}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <Box mt={2} textAlign="center">
            <Typography variant="body2">
              Don't have an account?{' '}
              <Button color="primary" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Typography>
          </Box>
        </Box>
      </Container>
  );
};

export default LoginPage;