import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from '../features/auth/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/product-list">Product List</Link>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </nav>
    );
};

export default Navbar;
