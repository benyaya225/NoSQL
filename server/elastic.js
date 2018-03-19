var fs = require("fs");
var elasticsearch = require('elasticSearch')
/**
 * Read the data from the json file
 */
module.exports.readData = function () {
    return new Promise((resolve, reject) => {
        fs.readFile("./Elastic_InspectionsRestaurant.json", "UTF8", (err, resul) => {
            if (err) return reject(err)
            else {
                return resolve(resul);
            }
        })
    })
}

/**Add the bulk method to elasticSearch */
module.exports.AddData = function(json, client){
    return new Promise((resolve,reject)=>{
        client.bulk({
            body : json
        },(err,resp)=>{
            if (err) return reject(err)
            else {
                return resolve(resp)
            }
        })
    })
    
}
