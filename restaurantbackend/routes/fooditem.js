/**
 * fooditem.js
 *
 * This route handles food item management for restaurants.
 * Main endpoints:
 *   POST /fooditem/fooditem_submit - Adds a new food item for a restaurant.
 *   POST /fooditem/fetch_all_fooditem - Fetches all food items for a restaurant.
 *   POST /fooditem/fooditem_edit_data - Edits food item details.
 *   POST /fooditem/fooditem_edit_icon - Updates food item icon.
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
 * POST /fooditem/fooditem_submit
 * Adds a new food item for a restaurant.
 */
router.post('/fooditem_submit', upload.any(), function(req, res, next) {
    pool.query("insert into fooditems (restaurantid, categoryid, fooditemname, foodtype, ingredients, price, offerprice, icon)values(?,?,?,?,?,?,?,?)", [req.body.restaurantid, req.body.categoryid, req.body.fooditemname, req.body.foodtype, req.body.ingredients, req.body.price, req.body.offerprice, req.files[0].filename], function(error, result) {
        if (error) {
            console.log("Errorrr", error);
            res.status(200).json({ status: false, message: 'Database Error' });
        } else {
            res.status(200).json({ status: true, message: 'category Added Successfully' });
        }
    });
});

/**
 * POST /fooditem/fetch_all_fooditem
 * Fetches all food items for a restaurant.
 */
router.post('/fetch_all_fooditem', function(req, res) {
    pool.query('select F.*, (select C.categoryname from category C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.restaurantid=?', [req.body.restaurantid], function(error, result) {
        if (error) {
            console.log(error);
            res.status(200).json({ status: false, message: 'Database Error', data: [] });
        } else {
            console.log(result);
            res.status(200).json({ status: true, data: result, message: 'Fooditems Get Successfully' });
        }
    });
});

/**
 * POST /fooditem/fooditem_edit_data
 * Edits food item details.
 */
router.post('/fooditem_edit_data', upload.any(), function(req, res, next) {
    pool.query("update fooditems set restaurantid=?, categoryid=?, fooditemname=?, foodtype=?, ingredients=?, price=?, offerprice=? where fooditemid=?", [req.body.restaurantid, req.body.categoryid, req.body.fooditemname, req.body.foodtype, req.body.ingredients, req.body.price, req.body.offerprice, req.body.fooditemid], function(error, result) {
        if (error) {
            console.log("Errorrr", error);
            res.status(200).json({ status: false, message: 'Database Error' });
        } else {
            res.status(200).json({ status: true, message: 'category Added Successfully' });
        }
    });
});

/**
 * POST /fooditem/fooditem_edit_icon
 * Updates food item icon.
 */
router.post('/fooditem_edit_icon', upload.any(), function(req, res, next) {
    pool.query("update fooditems set icon=? where fooditemid=?", [req.files[0].filename, req.body.fooditemid], function(error, result) {
        if(error)
        {
            console.log("Errorrr",error,req.body);
            res.status(200).json({status:false,message:'Database Error'})
        
        }
        else
        {
            res.status(200).json({status:true,message:'Icon Updated Successfully'})
        }   
        })
      });

      
        router.post('/fooditem_delete',upload.any(), function(req, res, next) {
          pool.query("delete from fooditems where fooditemid=?",[ req.body.fooditemid],function(error,result){
          if(error)
          {
              console.log("Errorrr",error,req.body);
              res.status(200).json({status:false,message:'Database Error'})
          
          }
          else
          {
              res.status(200).json({status:true,message:'food Item Deleted Successfully'})
          }
          
          })
        });

        router.post('/fetch_all_fooditem_categorywise',function(req,res){
            console.log(req.body)
            pool.query('select F.*, (select C.categoryname from category C where C.categoryid=F.categoryid) as categoryname from fooditems F where F.restaurantid=? and F.categoryid=?',[req.body.restaurantid,req.body.categoryid],function(error,result){
                if(error)
                {
                    console.log(error)
                    res.status(200).json({status:false,message:'Database Error',data:[]})
                
                }
                else
                {  console.log(result)
                    res.status(200).json({status:true,data:result,message:'Fooditems Get Successfully'})
                }
            
            }) 
            })
        
        

module.exports = router;