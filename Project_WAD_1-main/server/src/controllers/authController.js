// server/src/controllers/authController.js
const User = require('../models/userModel');
const RefreshToken = require('../models/refreshTokenModel'); // You'll still need this
const jwt = require('jsonwebtoken');

// Generate tokens
const generateTokens = (id) => {
    const accessToken = jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    );

    const refreshToken = jwt.sign(
        {id},
        process.env.REFRESH_TOKEN_SECRET || 'refresh-secret',
        {expiresIn: '7d'}
    );

    return {accessToken, refreshToken};
};

// Register User
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: 'All fields are required'});
    }

    const userExists = await User.findOne({email});
    if (userExists) return res.status(400).json({message: 'User already exists'});

    const user = await User.create({name, email, password});

    // Generate both tokens
    const {accessToken, refreshToken} = generateTokens(user.id);

    // Store refresh token in database
    await RefreshToken.create({
        token: refreshToken,
        user: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
    });

    res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken
    });
};

// getAllUsers function (move it to authController)
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}); // Get all users
        res.status(200).json(users); // Return users as JSON
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
};

// Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        // Generate both tokens
        const {accessToken, refreshToken} = generateTokens(user.id);

        // Store refresh token in database
        await RefreshToken.create({
            token: refreshToken,
            user: user._id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        });

        // Send both tokens in response
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            accessToken,
            refreshToken
        });
    } else {
        res.status(401).json({message: 'Invalid credentials'});
    }
};

// Refresh token handler
const refreshToken = async (req, res) => {
    const {refreshToken} = req.body; // Get from request body instead of cookie

    if (!refreshToken) {
        return res.status(401).json({message: 'Refresh token required'});
    }

    try {
        // Verify token
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'refresh-secret');

        // Check if token exists in database and is not revoked
        const storedToken = await RefreshToken.findOne({
            token: refreshToken,
            user: decoded.id,
            isRevoked: false,
            expiresAt: {$gt: new Date()}
        });

        if (!storedToken) {
            return res.status(401).json({message: 'Invalid refresh token'});
        }

        // Generate new access token
        const accessToken = jwt.sign(
            {id: decoded.id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({accessToken});
    } catch (error) {
        res.status(401).json({message: 'Invalid refresh token'});
    }
};

// Logout user
const logoutUser = async (req, res) => {
    const {refreshToken} = req.body; // Get from request body

    try {
        const result = await RefreshToken.findOneAndUpdate(
            {token: refreshToken},
            {
                isRevoked: true,
                revokedAt: new Date()
            }
        );

        if (!result) {
            return res.status(400).json({message: 'Invalid refresh token'});
        }

        res.status(200).json({message: 'Logged out successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error logging out'});
    }

    res.status(200).json({message: 'Logged out successfully'});
};

const refreshAccessToken = async (req, res) => {
    try {
        const {refreshToken} = req.body;

        if (!refreshToken) {
            return res.status(401).json({message: 'Refresh token is required'});
        }

        // Check if token exists and is not revoked
        const storedToken = await RefreshToken.findOne({
            token: refreshToken,
            isRevoked: false,
            expiresAt: {$gt: new Date()}
        }).populate('user');

        if (!storedToken) {
            return res.status(401).json({message: 'Invalid or expired refresh token'});
        }

        // Verify the refresh token (optional additional security)
        try {
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            // If verification fails, revoke the token
            await RefreshToken.findOneAndUpdate(
                {token: refreshToken},
                {isRevoked: true}
            );
            return res.status(401).json({message: 'Invalid refresh token'});
        }

        // Generate new access token
        const accessToken = jwt.sign(
            {userId: storedToken.user._id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        );

        res.json({accessToken});

    } catch (error) {
        console.error('Refresh token error:', error);
        res.status(500).json({message: 'Server error'});
    }
};


const testAdmin = (req, res) => {
    return res.json({message: "Test"});
}


module.exports = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
    refreshAccessToken,
    testAdmin,
    getAllUsers
};