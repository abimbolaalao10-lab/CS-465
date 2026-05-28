const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {

    const trips = await Trip.find({});

    res.json(trips);

};

module.exports = {
    tripsList
};