import { apiSlice } from '../api/apiSlice';
import { setCredentials, logout } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Store the token in localStorage
                    localStorage.setItem('token', data.token);
                    // Update redux state with user info AND token
                    dispatch(setCredentials({
                        user: data,
                        token: data.token
                    }));
                } catch (error) {
                    // Login failed, no action needed here
                }
            }
        }),
        verifyToken: builder.mutation({
            query: () => ({
                url: '/auth/verify',
                method: 'POST'
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("Login response data:", data)

                    if (data.valid) {
                        // If token is valid, update the user information
                        // Make sure to keep the token in the credentials
                        dispatch(setCredentials({
                            user: data.user,
                            token: localStorage.getItem('token')
                        }));
                    } else {
                        // If token is invalid, logout
                        dispatch(logout());
                    }
                } catch (error) {
                    // If verification fails, logout
                    dispatch(logout());
                }
            }
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
                // No need to send refresh token in the simplified approach
                body: {}
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error("Logout API failed:", error);
                    // Continue with logout even if API fails
                }
                // Dispatch logout action to clear Redux state
                dispatch(logout());
                // Clear localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    // Auto-login after successful registration
                    localStorage.setItem('token', data.token);
                    dispatch(setCredentials({
                        user: data,
                        token: data.token
                    }));
                } catch (error) {
                    // Registration failed, no state changes needed
                }
            }
        }),
    })
});

export const {
    useLoginMutation,
    useVerifyTokenMutation,
    useLogoutMutation,
    useRegisterMutation,
} = authApiSlice;