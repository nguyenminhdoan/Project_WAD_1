require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const passport = require('passport');
const setupRoutes = require('./routes');
const fs = require('fs');
const authRoutes = require('./routes/authRoutes'); // authRoutes'i dahil et

// Define the correct path for uploads in the Docker container
const uploadsDir = path.join(__dirname, 'uploads');
const avatarsDir = path.join(uploadsDir, 'avatars');

console.log('Uploads directory:', uploadsDir);
console.log('Avatars directory:', avatarsDir);

// Create necessary directories
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, {recursive: true});
}

if (!fs.existsSync(avatarsDir)) {
    fs.mkdirSync(avatarsDir, {recursive: true});
}

const app = express();

// Basic logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: function (origin, callback) {
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.options('*', cors());

connectDB();

// Static file serving
app.use('/uploads/avatars', express.static(avatarsDir));
app.use('/uploads', express.static(uploadsDir));

app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

// Setup all routes
app.use('/api', authRoutes); // Burada authRoutes'i kullanarak API'yi yönlendiriyoruz.

app.get('/api/check-paths', (req, res) => {
    res.json({
        uploadsDir: uploadsDir,
        avatarsDir: avatarsDir,
        uploadsExists: fs.existsSync(uploadsDir),
        avatarsExists: fs.existsSync(avatarsDir),
        avatarsFiles: fs.existsSync(avatarsDir) ? fs.readdirSync(avatarsDir) : []
    });
});

const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Path diagnostics available at: http://localhost:${PORT}/api/check-paths`);
});
