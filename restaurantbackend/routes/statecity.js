var express = require('express');
var router = express.Router();
const pool=require('./pool')

/* GET home page. */
router.get('/fetch_all_states', function(req, res, next) {
  try{
  pool.query("select * from states",function(error,result){
        if(error)
        {
          console.log(error);
          res.status(200).json({message:'Database Error...',data:[],status:false})
        }
        else
        {
          console.log(result);
          res.status(200).json({status:true,message:'success...',data:result})
        }
       })
     }
  catch(e)
  {
    console.log(e);
    res.status(200).json({message:'Server Error...',data:[],status:false})
  }
});

router.post('/fetch_all_cities', function(req, res, next) {
  try{
  pool.query("select * from city where stateid=?",[req.body.stateid],function(error,result){
        if(error)
        {
          console.log(error);
          res.status(200).json({message:'Database Error...',data:[],status:false})
        }
        else
        {
          console.log(result);
          res.status(200).json({status:true,message:'success...',data:result})
        }
       })
     }
  catch(e)
  {
    console.log(e);
    res.status(200).json({message:'Server Error...',data:[],status:false})
  }
});

module.exports = router;