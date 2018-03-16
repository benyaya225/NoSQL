var mongoose = require('mongoose'),
    extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

//Restaurant Class
var RestaurantSchema = new Schema({
    name: {type : String, required : true},
    borough: {type : String, required : true},
    buildingNum: {type : String, required : true},
    street: {type : String, required : true},
    zipcode: {type : String, required : true},
    cuisineType: {type : String, required : true},
    phone: {type : String, required : true}
})
module.exports = mongoose.model('Restaurant',RestaurantSchema );

    
//Inspection restaurant Class
var InspectionRestaurantSchema = new Schema({
    idRestaurant : {type: Number , required: true},
    restaurant : {type: RestaurantSchema , required : true},
    criticalFlag : {type : String, required : true},
    grade : {type : String , required : true},
    inspectionDate : {type : String , required : true},
    score : {type : Number , required : true},
    violationCode : {type : String, required : true},
    violationDescription : {type : String, required : true}

})
module.exports = mongoose.model('InspectionRestaurant', InspectionRestaurantSchema);

