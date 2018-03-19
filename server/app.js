var express = require('express');
var bodyParser = require('body-parser');
var client = require("./Connexion")
var app = express();

mongoose = require('mongoose'),

InspectionRestaurant = require('./api/models/inspectionRestaurantModel'), //created model loading here

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tomdenn:niksamere@ds213759.mlab.com:13759/nosql');

//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

var inspec = require('./api/routes/inspectionRestaurantRoutes');
inspec(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send(err.message);
  });
  
  module.exports = app;