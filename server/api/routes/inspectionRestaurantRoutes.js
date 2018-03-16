'use strict';
module.exports = function(app) {
  var inspectionRestaurant = require('../controllers/inspectionRestaurantController');

  app.route('api/restaurant/:restaurantName')
    .get(inspectionRestaurant.restaurant_Description);
};