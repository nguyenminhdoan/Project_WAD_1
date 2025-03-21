/*import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: ''
    });

    useEffect(() => {
        // Mock API call ----> I cannot see any available API to fetch the profile data
        const fetchProfile = async () => {
            const response = await fetch('/api/profile');
            const data = await response.json();
            setProfile(data);
        };
        fetchProfile();
    }, []);

    return (
        <div className="container">
            <h1>My Profile</h1>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <Link to="/edit-profile">
                <button className="primary">Edit Profile</button>
            </Link>
        </div>
    );
};

export default ProfilePage;*/
import { useState } from "react";
import { Link } from "react-router-dom";

// Mock user data based on your payload
const mockUser = {
    name: "Nguyen Minh Doan",
    email: "doan@gmail.com",
    avatar: "https://example.com/avatars/default.png"
};

const ProfilePage = () => {
    const [user, setUser] = useState(mockUser);

    return (
        <div className="container">
            <h1>My Profile</h1>
            <div className="profile-card">
                <img src={user.avatar} alt="Profile Avatar" className="profile-avatar" />
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <Link to="/edit-profile">
                    <button className="primary">Edit Profile</button>
                </Link>
            </div>
        </div>
    );
};

export default ProfilePage;
