import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute.jsx';
import ProductPage from '../pages/ProductPage.jsx';
import ProfilePage from '../pages/ProfilePage.jsx';
import EditProfilePage from '../pages/EditProfilePage.jsx';
import ProductListPage from '../pages/ProductListPage.jsx';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="product" element={<ProductPage />} />
                    <Route path="product-list" element={<ProductListPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="edit-profile" element={<EditProfilePage />} />
                    <Route
                        path="dashboard"
                        element={
                            <ProtectedRoute>
                                <DashboardPage />
                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;