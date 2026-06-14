const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// Trips collection routes
router.get('/trips',              ctrlTrips.tripsList);
router.post('/trips',             ctrlTrips.tripsAddTrip);

// Single trip routes (by tripCode)
router.get('/trips/:tripCode',    ctrlTrips.tripsFindByCode);
router.put('/trips/:tripCode',    ctrlTrips.tripsUpdateTrip);
router.delete('/trips/:tripCode', ctrlTrips.tripsDeleteTrip);

module.exports = router;
