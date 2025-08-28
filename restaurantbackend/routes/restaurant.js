/**
 * restaurant.js
 *
 * This route handles restaurant registration and management.
 * Main endpoints:
 *   POST /restaurant/restaurant_submit - Registers a new restaurant.
 *   GET /restaurant/fetch_all_restaurant - Fetches all restaurants with state and city names.
 *   POST /restaurant/restaurant_edit_data - Edits restaurant details.
 *   POST /restaurant/restaurant_edit_fssai - Updates restaurant FSSAI file.
 *
 * Dependencies:
 *   - pool: MySQL connection pool
 *   - upload: Multer for file uploads
 */

var express = require('express');
var router = express.Router();
var pool = require("./pool");
var upload = require("./multer");

/**
 * POST /restaurant/restaurant_submit
 * Registers a new restaurant.
 */
router.post('/restaurant_submit', upload.any(), function(req, res, next) {
    pool.query("insert into restaurants(restaurantname, ownername, phonenumber, emailid, mobileno, url, fssai, gstno, gsttype, filefssai, fileshopact, filelogo, address, stateid, cityid, createdat, updatedat,password)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.restaurantname, req.body.ownername, req.body.phonenumber, req.body.emailid, req.body.mobileno, req.body.url, req.body.fssai, req.body.gstno, req.body.gsttype, req.files[0].filename, req.files[1].filename, req.files[2].filename, req.body.address, req.body.stateid, req.body.cityid, req.body.createdat, req.body.updatedat, req.body.password], function(error, result) {
        if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: 'Database Error' });
        } else {
            res.status(200).json({ status: true, message: 'Restaurant Added Successfully' });
        }
    });
});

/**
 * GET /restaurant/fetch_all_restaurant
 * Fetches all restaurants with state and city names.
 */
router.get('/fetch_all_restaurant', function(req, res) {
    pool.query('select R.*,(select S.statename from states S where S.stateid=R.stateid) as statename, (select C.cityname from city C where C.cityid=R.cityid) as cityname  from restaurants R', function(error, result) {
        if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: 'Database Error', data: [] });
        } else {
            console.log(result);
            res.status(200).json({ status: true, data: result, message: 'Restaurant Added Successfully' });
        }
    });
});

/**
 * POST /restaurant/restaurant_edit_data
 * Edits restaurant details.
 */
router.post('/restaurant_edit_data', upload.any(), function(req, res, next) {
    pool.query("update  restaurants set restaurantname=?, ownername=?, phonenumber=?, emailid=?, mobileno=?, url=?, fssai=?, gstno=?, gsttype=?,  address=?, stateid=?, cityid=?,  updatedat=? where restaurantid=?", [req.body.restaurantname, req.body.ownername, req.body.phonenumber, req.body.emailid, req.body.mobileno, req.body.url, req.body.fssai, req.body.gstno, req.body.gsttype, req.body.address, req.body.stateid, req.body.cityid, req.body.updatedat, req.body.restaurantid], function(error, result) {
        if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: 'Database Error' });
        } else {
            res.status(200).json({ status: true, message: 'Restaurant Updated Successfully' });
        }
    });
});

/**
 * POST /restaurant/restaurant_edit_fssai
 * Updates restaurant FSSAI file.
 */
router.post('/restaurant_edit_fssai', upload.any(), function(req, res, next) {
    pool.query("update restaurants set filefssai=? where restaurantid=?", [req.files[0].filename, req.body.restaurantid], function(error, result) {
        if (error) {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    
    }
    else
    {
        res.status(200).json({status:true,message:'Fssai Certificate Updated Successfully'})
    }
    
    })
    
     
    });

    router.post('/restaurant_edit_shopact',upload.any(), function(req, res, next) {
        pool.query("update restaurants set fileshopact=? where restaurantid=?",[ req.files[0].filename,req.body.restaurantid],function(error,result){
        if(error)
        {
            console.log(error)
            res.status(200).json({status:false,message:'Database Error'})
        
        }
        else
        {
            res.status(200).json({status:true,message:'ShopAct Certificate Updated Successfully'})
        }
        
        })
        
         
        });

        router.post('/restaurant_edit_logo',upload.any(), function(req, res, next) {
            pool.query("update restaurants set filelogo=? where restaurantid=?",[ req.files[0].filename,req.body.restaurantid],function(error,result){
            if(error)
            {
                console.log(error)
                res.status(200).json({status:false,message:'Database Error'})
            
            }
            else
            {
                res.status(200).json({status:true,message:'Logo Updated Successfully'})
            }
            
            })
            
             
            });
              
            router.post('/restaurant_delete',upload.any(), function(req, res, next) {
                pool.query("delete from restaurants  where restaurantid=?",[req.body.restaurantid],function(error,result){
                if(error)
                {
                    console.log(error)
                    res.status(200).json({status:false,message:'Database Error'})
                
                }
                else
                {
                    res.status(200).json({status:true,message:'Restaurant Deleted Successfully'})
                }
                
                })
                
                 
                });
                  
    

    module.exports = router;
