import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // Form input değişikliklerini handle et
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);

      // Başarılı olursa kullanıcıyı login sayfasına yönlendir
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" align="center" gutterBottom>
          Kayıt Ol
        </Typography>

        {/* Hata mesajı */}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Ad"
            name="name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="E-posta"
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
            label="Şifre"
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
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? 'Kayıt Ediliyor...' : 'Kayıt Ol'}
          </Button>
        </form>

        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Zaten bir hesabınız var mı?{' '}
            <Button color="primary" onClick={() => navigate('/login')}>
              Giriş Yap
            </Button>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
