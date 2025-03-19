import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage'; // RegisterPage import edildi
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute.jsx';
import EditProductPage from '../pages/EditProductPage.jsx';
import EditProfilePage from '../pages/EditProfilePage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="login" element={<LoginPage/>}/>
                    <Route path="register" element={<RegisterPage/>}/> {/* Register route eklendi */}
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage/>
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
