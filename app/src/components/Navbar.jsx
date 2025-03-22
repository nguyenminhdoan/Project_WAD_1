import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { Button } from '@mui/material';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the authentication state from Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Logout function that clears user data from Redux and session storage
  const handleLogout = () => {
    // Dispatch the logout action to clear user data from Redux
    dispatch(logout());

    // Optionally clear stored tokens if you have them in localStorage/sessionStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');

    // Redirect the user to the login page after logout
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/product-list">Product List</Link>
      <Link to="/register" style={{ textDecoration: 'none' }}>
        <Button style={{ color: 'white' }}>Register</Button>
      </Link>

      {/* Conditionally render Login/Logout buttons based on authentication status */}
      {!isAuthenticated ? (
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <Button style={{ color: 'white' }}>Login</Button>
        </Link>
      ) : (
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          sx={{
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#d32f2f', // A bit darker on hover
              boxShadow: 6,
            },
          }}
        >
          Logout
        </Button>
      )}
    </nav>
  );
};

export default Navbar;
