const express = require('express');
const passport = require('passport');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');

// JWT auth middleware: protects admin write endpoints
const requireAuth = passport.authenticate('jwt', { session: false });

// Authentication routes
router.post('/register', ctrlAuth.register);
router.post('/login',    ctrlAuth.login);

// Trips collection routes
router.get('/trips',              ctrlTrips.tripsList);
router.post('/trips',  requireAuth, ctrlTrips.tripsAddTrip);

// Single trip routes (by tripCode)
router.get('/trips/:tripCode',                ctrlTrips.tripsFindByCode);
router.put('/trips/:tripCode',    requireAuth, ctrlTrips.tripsUpdateTrip);
router.delete('/trips/:tripCode', requireAuth, ctrlTrips.tripsDeleteTrip);

module.exports = router;
