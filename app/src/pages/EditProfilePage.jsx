import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock user data
const mockUser = {
    name: "Nguyen Minh Doan",
    email: "doan@gmail.com",
    password: "123456",
    avatar: "https://example.com/avatars/default.png"
};

const EditProfilePage = () => {
    const [formData, setFormData] = useState(mockUser);
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Profile:", formData);
        alert("Profile updated successfully!");
        navigate("/profile"); // Redirect to profile page
    };

    return (
        <div className="container">
            <h1>Edit Profile</h1>
            <form onSubmit={handleSubmit} className="profile-form">
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />

                <label>Avatar URL:</label>
                <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} />

                <div className="avatar-preview">
                    <p>Avatar Preview:</p>
                    <img src={formData.avatar} alt="Avatar Preview" className="avatar-image" />
                </div>

                <button type="submit" className="primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfilePage;