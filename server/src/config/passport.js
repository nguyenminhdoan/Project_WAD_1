const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/userModel');
require('dotenv').config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
    passport.use(
        new Strategy(opts, async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id);
                if (user) return done(null, user);
                return done(null, false);
            } catch (error) {
                return done(error, false);
            }
        })
    );
};
