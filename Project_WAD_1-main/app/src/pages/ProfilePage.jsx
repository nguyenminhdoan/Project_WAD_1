import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [profile, setProfile] = useState({});

    useEffect(() => {
        axios.get('/api/profile')
            .then(response => setProfile(response.data))
            .catch(error => console.error('Error fetching profile:', error));
    }, []);

    return (
        <div>
            <h2>Profile Details</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Password:</strong> {profile.password}</p>
        </div>
    );
};

export default ProfilePage;