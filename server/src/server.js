require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const passport = require('passport');
const setupRoutes = require('./routes');


const app = express();
connectDB();

app.use(express.json());
app.use(passport.initialize());
require('./config/passport')(passport);

setupRoutes(app)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
