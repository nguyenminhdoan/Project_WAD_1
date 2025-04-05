import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

// User API slice (extends the main API slice)
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get user profile
        getProfile: builder.query({
            query: (userId) => `/users/profile/${userId}`,
            providesTags: ['Profile']
        }),

        // Update user profile (without avatar)
        updateProfile: builder.mutation({
            query: (profileData) => ({
                url: `/users/profile`,
                method: 'PUT',
                body: profileData,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Profile']
        }),

        // Update user profile with avatar (multipart form data)
        updateProfileWithAvatar: builder.mutation({
            query: (formData) => ({
                url: '/users/profile',
                method: 'PUT',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['Profile']
        }),
    })
});

// Export the auto-generated hooks
export const {
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateProfileWithAvatarMutation,
} = userApiSlice;

// User slice for UI-related state
const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        profileStatus: 'idle',
        error: null,
        updateSuccess: false,
        uploadProgress: 0
    },
    reducers: {
        setUploadProgress: (state, action) => {
            state.uploadProgress = action.payload;
        },
        clearUpdateSuccess: (state) => {
            state.updateSuccess = false;
        }
    },
    // Handle async actions from our API slice
    extraReducers: (builder) => {
        // getProfile states
        builder
            .addMatcher(
                userApiSlice.endpoints.getProfile.matchPending,
                (state) => {
                    state.profileStatus = 'loading';
                }
            )
            .addMatcher(
                userApiSlice.endpoints.getProfile.matchFulfilled,
                (state, action) => {
                    state.profileStatus = 'succeeded';
                    state.profile = action.payload;
                    state.error = null;
                }
            )
            .addMatcher(
                userApiSlice.endpoints.getProfile.matchRejected,
                (state, action) => {
                    state.profileStatus = 'failed';
                    state.error = action.error.message;
                }
            )
            // updateProfile states
            .addMatcher(
                userApiSlice.endpoints.updateProfile.matchFulfilled,
                (state, action) => {
                    state.profile = action.payload;
                    state.updateSuccess = true;
                }
            )
            // updateProfileWithAvatar states
            .addMatcher(
                userApiSlice.endpoints.updateProfileWithAvatar.matchFulfilled,
                (state, action) => {
                    state.profile = action.payload;
                    state.updateSuccess = true;
                    state.uploadProgress = 0;
                }
            );
    }
});

// Export actions
export const { setUploadProgress, clearUpdateSuccess } = userSlice.actions;

// Export selectors
export const selectProfile = (state) => state.user.profile;
export const selectProfileStatus = (state) => state.user.profileStatus;
export const selectUpdateSuccess = (state) => {
    return state?.user?.profile?.updateSuccess || false;
};

export const selectProfileError = (state) => state.user.error;
export const selectUploadProgress = (state) => state.user.uploadProgress;

export default userSlice.reducer;