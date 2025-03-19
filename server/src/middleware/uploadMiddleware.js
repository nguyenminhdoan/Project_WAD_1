const path = require('path');
const multer = require('multer');
const fs = require('fs');

// Path definitions
const uploadsDir = path.join(__dirname, '../uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');
const productsDir = path.join(uploadsDir, 'products');

// Create directories if they don't exist
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}
if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir);
}
if (!fs.existsSync(productsDir)) {
    fs.mkdirSync(productsDir);
}

// Avatar storage configuration
const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, avatarsDir); // Save files to the avatars directory
    },
    filename: function (req, file, cb) {
        cb(null, 'user-' + Date.now() + path.extname(file.originalname));
    }
});

// Product image storage configuration
const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, productsDir); // Save files to the products directory
    },
    filename: function (req, file, cb) {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname));
    }
});

// Create upload instances
const upload = multer({ storage: avatarStorage });
const uploadProduct = multer({ storage: productStorage });

module.exports = {
    upload,
    uploadProduct,
    uploadsDir,
    avatarsDir,
    productsDir
};