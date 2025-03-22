const express = require("express");
const {
    getUserProfile,
    updateUserProfile,
} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");
const {upload} = require("../middleware/uploadMiddleware"); //


const router = express.Router();

// Protected routes
router.get('/profile/:id', getUserProfile);
router.put('/profile', upload.single('avatar'), updateUserProfile);


module.exports = router;
