/**
 * superadmin.js
 *
 * This route handles superadmin authentication and management.
 * Main endpoints:
 *   POST /superadmin/checklogin - Authenticates superadmin using email and password, returns JWT token on success.
 *
 * Dependencies:
 *   - pool: MySQL connection pool
 *   - jwt: JSON Web Token for authentication
 */

var express = require("express");
var router = express.Router();
var pool = require("./pool");
var jwt = require("jsonwebtoken");

/**
 * POST /superadmin/checklogin
 * Authenticates a superadmin using email and password.
 * Returns JWT token if credentials are valid.
 */
router.post("/checklogin", function (req, res, next) {
  console.log(req.body);
  pool.query(
    "select * from superadmin where emailid=? and password=?",
    [req.body.emailid, req.body.password],
    function (error, result) {
      if (error) {
        res.status(200).json({ status: false, data: [], message: "Server Error..." });
      } else {
        if (result.length == 1) {
          var token = jwt.sign({ data: result[0] }, "shhhhhh", { expiresIn: 1000 * 60 });
          console.log(token);
          res.status(200).json({
            status: true,
            data: result[0],
            message: "Login Successful",
            token,
          });
        } else {
          res.status(200).json({
            status: false,
            data: [],
            message: "Invalid userid/password",
          });
        }
      }
    }
  );
});

module.exports = router;
