const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "1h"});
};

// Register user
const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const userExists = await User.findOne({email});
    if (userExists) {
        return res.status(400).json({message: "User already exists"});
    }
    const token = generateToken(email);
    const user = await User.create({name, email, password, token});

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token,
        });
    } else {
        res.status(400).json({message: "Invalid user data"});
    }
};

// Authenticate user
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } else {
        res.status(401).json({message: "Invalid credentials"});
    }
};

// Get user profile
const getUserProfile = async (req, res) => {
    const user = await User.findOne({email: req.user.email});

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404).json({message: "User not found"});
    }
};

const test = (req, res) => {
    return res.json({message: "Test"});
}

module.exports = {registerUser, loginUser, getUserProfile, test};
