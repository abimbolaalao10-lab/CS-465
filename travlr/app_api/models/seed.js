const mongoose = require('mongoose');

require('./travlr');

mongoose.connect('mongodb://127.0.0.1/travlr');

const Trip = mongoose.model('trips');

async function seedDB() {
    try {

        await Trip.deleteMany({});

        await Trip.create([
            {
                code: 'OCEAN',
                name: 'Ocean Adventure',
                length: '3 days',
                start: new Date('2026-06-15'),
                resort: 'Maldives Resort',
                perPerson: '$1200',
                image: 'sea-sound.jpg',
                description: 'Enjoy beaches and diving adventures.'
            },
            {
                code: 'MOUNT',
                name: 'Mountain Escape',
                length: '5 days',
                start: new Date('2026-07-10'),
                resort: 'Swiss Alps',
                perPerson: '$1800',
                image: 'rooms.png',
                description: 'Experience beautiful mountain scenery.'
            }
        ]);

        console.log('Trips inserted successfully');

    } catch (err) {

        console.log(err);

    } finally {

        mongoose.connection.close();

    }
}

seedDB();