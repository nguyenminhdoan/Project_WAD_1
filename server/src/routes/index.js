const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes');

// Add other routes here

module.exports = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/products', productRoutes);
    // Register other routes here
};