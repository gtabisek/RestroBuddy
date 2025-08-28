/**
 * statecity.js
 *
 * This route handles state and city data for restaurant registration.
 * Main endpoints:
 *   GET /statecity/fetch_all_states - Fetches all states.
 *   POST /statecity/fetch_all_cities - Fetches all cities for a given state.
 *
 * Dependencies:
 *   - pool: MySQL connection pool
 */

var express = require('express');
var router = express.Router();
var pool = require('./pool');

/**
 * GET /statecity/fetch_all_states
 * Fetches all states.
 */
router.get('/fetch_all_states', function(req, res, next) {
  try {
    pool.query("select * from states", function(error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ status: false, message: 'Database Error...', data: [] });
      } else {
        console.log(result);
        res.status(200).json({ status: true, message: 'Success...', data: result });
      }
    });
  } catch (e) {
    res.status(200).json({ status: false, message: 'Server Error...', data: [] });
  }
});

/**
 * POST /statecity/fetch_all_cities
 * Fetches all cities for a given state.
 */
router.post('/fetch_all_cities', function(req, res, next) {
  try {
    pool.query("select * from city where stateid=?", [req.body.stateid], function(error, result) {
      if (error) {
        console.log(error);
        res.status(200).json({ status: false, message: 'Database Error...', data: [] });
      } else {
        console.log(result);
        res.status(200).json({ status: true, message: 'Success...', data: result });
      }
    });
  } catch (e) {
    res.status(200).json({ status: false, message: 'Server Error...', data: [] });
  }
});

module.exports = router;
