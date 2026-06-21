const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('users');

const register = async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email
        });

        user.setPassword(req.body.password);
        await user.save();

        const token = user.generateJwt();
        res.status(200).json({ token });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: 'Email already registered' });
        }
        res.status(400).json(err);
    }
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    passport.authenticate('local', (err, user) => {
        if (err) {
            return res.status(404).json(err);
        }
        if (user) {
            const token = user.generateJwt();
            return res.status(200).json({ token });
        }
        return res.status(401).json({ message: 'Invalid email or password' });
    })(req, res);
};

module.exports = {
    register,
    login
};
