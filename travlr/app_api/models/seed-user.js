const mongoose = require('mongoose');

require('./user');

mongoose.connect('mongodb://127.0.0.1/travlr');

const User = mongoose.model('users');

async function seedUser() {
    try {
        await User.deleteMany({ email: 'admin@travlr.com' });

        const user = new User({
            name: 'Admin User',
            email: 'admin@travlr.com'
        });
        user.setPassword('TravlrAdmin123');
        await user.save();

        console.log('Mock admin user created:');
        console.log('  email:    admin@travlr.com');
        console.log('  password: TravlrAdmin123');

    } catch (err) {

        console.log(err);

    } finally {

        mongoose.connection.close();

    }
}

seedUser();
