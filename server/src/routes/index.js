const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
// Add other routes here

module.exports = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    // Register other routes here
};