var mongoose = require('mongoose');
const Restaurant = mongoose.model('Restaurant');
const InspectionRestaurant = mongoose.model('InspectionRestaurant');


exports.restaurant_Description = function(req,res){
    Restaurant.findOne({'name': req.params.restaurantName},function(err,restaurant){
        if(err) res.send(err);
        
        res.json(restaurant);
    })

}

exports.list_All_InspectionAttribute = function(req,res){
    InspectionRestaurant.distinct(req.params.filter,function(err,result){
        if(err) res.send(err);

        res.json(result);
    })
}

exports.list_All_RestaurantAttribute = function(req,res){
    Restaurant.distinct(req.params.filter,function(err,result){
        if(err) res.send(err);

        res.json(result);
    })
}
exports.list_All = function(req,res){
    InspectionRestaurant.find({},function(err,result){
        if(err) res.send(err);

        res.json(result);
    })
}