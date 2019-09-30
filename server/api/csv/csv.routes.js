'use strict';
const express = require('express');
// Import the Controller so we may assign specific functions to a route
const controller = require('./csv.controller');

// Assign the route variable to an Express.Route handler
const router = express.Router();

/**
 * path: /api/csv
 * method: POST
 * function: create() in the csv.controller.js file
 */
router.post('/', controller.parse);

// We export the routes to the express app, in the routes.js file we will assign the base URL for this endpoint.
// in this file we simply want to specify the path after the base /api/csv url.
module.exports = router;
