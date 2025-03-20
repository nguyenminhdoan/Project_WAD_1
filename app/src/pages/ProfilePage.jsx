import { useState, useEffect } from 'react';
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

export default ProfilePage;