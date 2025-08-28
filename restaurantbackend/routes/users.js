/**
 * users.js
 *
 * Main users route for the backend application.
 * Used for user-related endpoints (currently placeholder).
 *
 * Endpoints:
 *   GET /users - Responds with a resource message.
 */

var express = require('express');
var router = express.Router();

/**
 * GET /users
 * Responds with a resource message.
 */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
