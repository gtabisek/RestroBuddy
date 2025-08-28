/**
 * waiter.js
 *
 * This route handles waiter management for restaurants.
 * Main endpoints:
 *   POST /waiter/waiter_submit - Adds a new waiter for a restaurant.
 *   POST /waiter/fetch_all_waiter - Fetches all waiters for a restaurant.
 *   POST /waiter/waiter_edit_data - Edits waiter details.
 *   POST /waiter/waiter_edit_icon - Updates waiter picture.
 *
 * Dependencies:
 *   - pool: MySQL connection pool
 *   - upload: Multer for file uploads
 */

var express = require('express');
var router = express.Router();
const pool = require('./pool');
const upload = require('./multer');

/**
 * POST /waiter/waiter_submit
 * Adds a new waiter for a restaurant.
 */
router.post('/waiter_submit', upload.any(), function(req, res, next) {
    pool.query("insert into waiters (restaurantid, waitername, gender, dob, mobileno, emailid, address, picture) values(?,?,?,?,?,?,?,?)", [req.body.restaurantid, req.body.waitername, req.body.gender, req.body.dob, req.body.mobileno, req.body.emailid, req.body.address, req.files[0].filename], function(error, result) {
        if (error) {
            console.log("Errorrr", error);
            res.status(200).json({ status: false, message: 'Database Error' });
        } else {
            res.status(200).json({ status: true, message: 'waiter Added Successfully' });
        }
    });
});

/**
 * POST /waiter/fetch_all_waiter
 * Fetches all waiters for a restaurant.
 */
router.post('/fetch_all_waiter', function(req, res) {
    pool.query('select * from waiters where restaurantid=?', [req.body.restaurantid], function(error, result) {
        if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: 'Database Error', data: [] });
        } else {
            console.log(result);
            res.status(200).json({ status: true, data: result, message: 'waiters Get Successfully' });
        }
    });
});

/**
 * POST /waiter/waiter_edit_data
 * Edits waiter details.
 */
router.post('/waiter_edit_data', upload.any(), function(req, res, next) {
    pool.query("update waiters set restaurantid=?, waitername=?, gender=?, dob=?, mobileno=?, emailid=?, address=? where waiterid=?", [req.body.restaurantid, req.body.waitername, req.body.gender, req.body.dob, req.body.mobileno, req.body.emailid, req.body.address, req.body.waiterid], function(error, result) {
        if (error) {
            console.log("Errorrr", error);
            res.status(200).json({ status: false, message: 'Database Error' });
        } else {
            res.status(200).json({ status: true, message: 'Waiter Updated Successfully' });
        }
    });
});

/**
 * POST /waiter/waiter_edit_icon
 * Updates waiter picture.
 */
router.post('/waiter_edit_icon', upload.any(), function(req, res, next) {
    pool.query("update waiters set picture=? where waiterid=?", [req.files[0].filename, req.body.waiterid], function(error, result) {
        if (error) {
            console.log("Errorrr", error);
            res.status(200).json({ status: false, message: 'Database Error' });
            } else {
                res.status(200).json({status:true,message:'Picture Updated Successfully'})
            }
        });
    });


    router.post('/waiter_delete',upload.any(), function(req, res, next) {
      pool.query("delete from waiters where waiterid=?",[ req.body.waiterid],function(error,result){
      if(error)
      {
          console.log("Errorrr",error,req.body);
          res.status(200).json({status:false,message:'Database Error'})
      
      }
      else
      {
          res.status(200).json({status:true,message:'Waiter Deleted Successfully'})
      }
      
      })
    });

module.exports = router;