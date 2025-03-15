import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logout} from '../features/auth/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();

    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={() => dispatch(logout())}>Logout</button>
        </nav>
    );
};

export default Navbar;
