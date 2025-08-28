/**
 * index.js
 *
 * Main index route for the backend application.
 * Used for rendering the default homepage.
 *
 * Endpoints:
 *   GET / - Renders the index page with a title.
 */

var express = require('express');
var router = express.Router();

/**
 * GET /
 * Renders the index page with a title.
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
