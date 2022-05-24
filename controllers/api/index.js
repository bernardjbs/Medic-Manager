const router = require('express').Router();

// Import api routes to pass to ./controllers/home-routes
const userRoutes = require('./userRoutes');

// Load end points onto /api
router.use('/users', userRoutes);

module.exports = router;