const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1h'});
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
    res.status(201).json({_id: user.id, name: user.name, email: user.email, token: generateToken(user.id)});
};

// Login User
const loginUser = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        res.json({_id: user.id, name: user.name, email: user.email, token: generateToken(user.id)});
    } else {
        res.status(401).json({message: 'Invalid credentials'});
    }
};


// Get User Profile
const getUserProfile = async (req, res) => {
    res.json({_id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role});
};

module.exports = {registerUser, loginUser, getUserProfile};
