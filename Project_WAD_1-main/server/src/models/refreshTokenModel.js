const mongoose = require('mongoose');

const refreshTokenSchema = new mongoose.Schema({
    token: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    expiresAt: {type: Date, required: true},
    isRevoked: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('RefreshToken', refreshTokenSchema);