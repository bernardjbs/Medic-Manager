const router = require('express').Router();

// Setup routers for client side info & API
const homeRoutes = require('./home-routes.js');
const apiRoutes = require('./api');

// load routes for export to server.js
router.use('/', homeRoutes);
router.use('/api', apiRoutes); 

module.exports = router;
