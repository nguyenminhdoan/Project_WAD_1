require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const setupRoutes = require('./routes');



const app = express();
app.use(cors({
    origin: function(origin, callback) {
        // Allow any origin
        callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Explicitly handle OPTIONS requests
app.options('*', cors());


connectDB();

app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

setupRoutes(app)


const PORT = process.env.BACKEND_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
