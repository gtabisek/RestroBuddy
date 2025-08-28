
/**
 * admin.js
 *
 * This route handles admin authentication for restaurant admins.
 * Main endpoints:
 *   POST /admin/checklogin - Authenticates admin using email and password, returns JWT token on success.
 *
 * Dependencies:
 *   - pool: MySQL connection pool
 *   - jwt: JSON Web Token for authentication
 */

const express = require('express');
const router = express.Router();
const pool = require('./pool');
var jwt = require("jsonwebtoken");

/**
 * POST /admin/checklogin
 * Authenticates a restaurant admin using email and password.
 * Returns JWT token if credentials are valid.
 */
router.post('/checklogin', function(req, res, next) {
  console.log(req.body);
  pool.query('select * from restaurants where emailid=? and password=?', [req.body.emailid, req.body.password], function(error, result) {
    if (error) {
      res.status(200).json({ status: false, data: [], message: 'Server Error....' });
    } else {
      if (result.length == 1) {
        var token = jwt.sign({ data: result[0] }, "shhhhhh");
        res.status(200).json({ status: true, data: result[0], message: 'Login Successful....', token });
      } else {
        res.status(200).json({ status: false, data: [], message: 'Invalid userid/password' });
      }
    }
  });
});

module.exports = router;