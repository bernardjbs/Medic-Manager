const router = require('express').Router();

// Import models (tables) to extract info from and import info to
const { Projects, Users, Posts } = require('../models');

// Authenticate that user is logged in before allowing access to certain parts of webpage with this middleware
const withAuth = require('../utils/auth')

// CRUD operations
// router.get('/endpoint', (req, res) => {})
// router.post('/endpoint', (req, res) => {})
// router.put('/endpoint', (req, res) => {})
// router.delete('/endpoint', (req, res) => {})


module.exports = router;