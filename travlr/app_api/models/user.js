const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'travlr_getaways_dev_secret_change_in_production';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hash: String,
    salt: String
});

// Generate salt + hash from a plaintext password using PBKDF2
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, 'sha512')
        .toString('hex');
};

// Compare a plaintext password against the stored hash
userSchema.methods.validPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

// Generate a signed JWT for this user
userSchema.methods.generateJwt = function () {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); // token valid for 7 days

    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            name: this.name,
            exp: parseInt(expiry.getTime() / 1000, 10)
        },
        jwtSecret
    );
};

mongoose.model('users', userSchema);
