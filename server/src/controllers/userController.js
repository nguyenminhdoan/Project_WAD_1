const User = require("../models/userModel");
const fs = require('fs');
const path = require('path');
const {uploadsDir} = require('../middleware/uploadMiddleware');


// Get user profile
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
        });
    } else {
        res.status(404).json({message: "User not found"});
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req?.body?.userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        // Update user details
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) user.email = req.body.email;
        if (req.body.password) user.password = req.body.password;

        // Handle avatar update
        if (req.file) {
            // If user already has an avatar, delete the old file
            if (user.avatar) {
                try {
                    // Extract just the filename from the stored path
                    const filename = path.basename(user.avatar);
                    const filePath = path.join(uploadsDir, filename);

                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                } catch (error) {
                    console.log('Failed to delete old avatar:', error);
                    // Continue even if deletion fails
                }
            }

            // Store just the filename in the database for simplicity
            user.avatar = `/uploads/avatars/${req.file.filename}`;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            avatar: updatedUser.avatar,
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({message: "Server error", error: error.message});
    }
};


const test = (req, res) => {
    return res.json({message: "Test"});
};

module.exports = {
    getUserProfile,
    updateUserProfile,
};

