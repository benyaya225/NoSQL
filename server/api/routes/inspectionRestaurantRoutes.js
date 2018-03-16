'use strict';
module.exports = function(app) {
  var inspectionRestaurant = require('../controllers/inspectionRestaurantController');

  app.route('/api/restaurant/:restaurantName')
    .get(inspectionRestaurant.restaurant_Description);

  app.route('/api/inspection_Restaurant/:attribut')
    .get(inspectionRestaurant.list_All_InspectionAttribute);

  app.route('/api/restaurant/:attribut')
    .get(inspectionRestaurant.list_All_RestaurantAttribute);

  app.route('/api/inspection_Restaurant')
    .get(inspectionRestaurant.list_All);
};

