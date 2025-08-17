const express =require('express');
const router = express.Router();
const pool=require('./pool');
const jwt=require('jsonwebtoken');

/*
router.post("/chktoken", function (req, res) {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  jwt.verify(token, "shhhhhh", function (err, decoded) {
    console.log(err, decoded);
    res.status(200).json(decoded);
  });
  //res.status(200).json({'status':'invalid token'})
});
*/

router.post('/checklogin',function(req,res,next){
  console.log(req.body);
  pool.query('select * from superadmin where emailid=? and password=?',[req.body.emailid,req.body.password],function(error,result){
    if(error)
    {
      res.status(200).json({status:false,data:[],message:'Server Error....'})
    }
    else
    {
     if(result.length==1){
       var token=jwt.sign({data:result[0]},"shhhhhh",
       //{expiresIn:"60s"}
       ); 
       console.log(token);
       res.status(200).json({status:true,data:result[0],message:'Login Successful....',token});
      }
      else
      {
        res.status(200).json({status:false,data:[],message:'Invalid userid/password'});
      }
    }
  })
});

module.exports=router;