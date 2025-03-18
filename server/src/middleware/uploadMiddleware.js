const path = require('path');
const multer = require('multer');

const uploadsDir = path.join(__dirname, '../uploads'); // Go up one level from middleware folder
const avatarsDir = path.join(uploadsDir, 'avatars');

// Create the storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, avatarsDir); // Save files to the avatars directory
    },
    filename: function (req, file, cb) {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

module.exports = {
    upload,
    uploadsDir,
    avatarsDir
};