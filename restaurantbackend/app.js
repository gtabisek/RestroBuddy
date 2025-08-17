var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var jwt = require("jsonwebtoken")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var statecityRouter = require('./routes/statecity');
const restaurantRouter = require('./routes/restaurant');
const categoryRouter=require('./routes/category');
const fooditemRouter=require('./routes/fooditem');
const tablebookingRouter=require('./routes/tablebooking');
const waiterRouter=require('./routes/waiter');
const superadminRouter=require('./routes/superadmin');
const adminRouter=require('./routes/admin');
const waitertableRouter=require('./routes/waitertable');
const billingRouter=require('./routes/billing');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/superadmin',superadminRouter);
app.use('/admin',adminRouter);

app.use((req,res,next)=>{
  const token = req.headers.authorization;
  console.log(token);
  jwt.verify(token,"shhhhhh",function(err,decoded){
    console.log(err,decoded);
    if(decoded){
      next();
    }else{
      res.status(401).json({status:false,message:"Invalid token"})
    }
  })
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/statecity',statecityRouter);
app.use('/restaurants',restaurantRouter);
app.use('/category',categoryRouter);
app.use('/fooditem',fooditemRouter);
app.use('/tablebooking',tablebookingRouter);
app.use('/waiter',waiterRouter);

app.use('/waitertable',waitertableRouter);
app.use('/billing',billingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
