const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { Strategy: LocalStrategy } = require('passport-local');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const jwtSecret = process.env.JWT_SECRET || 'travlr_getaways_dev_secret_change_in_production';

// JWT strategy: validates the bearer token on protected routes
const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
};

passport.use(
    new JwtStrategy(jwtOpts, async (payload, done) => {
        try {
            const user = await User.findById(payload._id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (err) {
            return done(err, false);
        }
    })
);

// Local strategy: validates email + password during login
passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async (email, password, done) => {
            try {
                const user = await User.findOne({ email });
                if (!user || !user.validPassword(password)) {
                    return done(null, false, { message: 'Invalid email or password' });
                }
                return done(null, user);
            } catch (err) {
                return done(err);
            }
        }
    )
);
