const passport = require('passport');

const protect = passport.authenticate('jwt', {session: false});

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({message: 'Access denied'});
    }
    next();
};

module.exports = {protect, adminOnly};
