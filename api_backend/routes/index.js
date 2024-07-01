const express = require('express');
const router = express.Router();

// Import route modules
const usersRoutes = require('./users');

// Use route modules
router.use('/users', usersRoutes); // change to your API base URL

module.exports = router;