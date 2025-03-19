import {useDispatch} from 'react-redux';
import {loginSuccess} from '../features/auth/authSlice';

const LoginPage = () => {
    const dispatch = useDispatch();

    const handleLogin = () => {
        const mockUser = {name: 'John Doe', role: 'admin'};
        dispatch(loginSuccess(mockUser));
    };

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Login</button>

        </div>
    );
};

export default LoginPage;
