const express = require('express');
const {registerUser, loginUser, getUserProfile} = require('../controllers/authController');
const {protect, adminOnly} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);
router.get('/admin', protect, adminOnly, (req, res) => res.json({message: 'Admin access granted'}));

module.exports = router;
