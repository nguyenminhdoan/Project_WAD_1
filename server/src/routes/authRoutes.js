const express = require('express');
const {
    registerUser,
    loginUser,
    getUserProfile,
    refreshToken,
    logoutUser,
    testAdmin
} = require('../controllers/authController');
const {protect, adminOnly} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshToken); // Token sent in request body
router.post('/logout', logoutUser); // Token sent in request body
// router.get('/profile', protect);
router.get('/admin', protect, adminOnly, (req, res) => res.json({message: 'Admin access granted'}));
router.get('/adminTest', protect, testAdmin)
module.exports = router;