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
module.exports.AddData = function (json, client) {
    return new Promise((resolve, reject) => {
        client.bulk({
            body: json
        }, (err, resp) => {
            if (err) return reject(err)
            else {
                return resolve(resp)
            }
        })
    })

}

/**
 * Delete the index passed in input
 * @param {*} config index name
 * @param {*} client elastic client
 */
module.exports.DeleteIndex = function (config, client) {
    console.log(client)
    return new Promise((resolve, reject) => {
        client.indices.delete({
            index: index
        }, (err, res) => {
            if (err) return reject(err)
            else {
                console.log("Index " + index + " have been deleted")
                return resolve(res)
            }
        })
    })
}

/**
 * S
 * @param {*} client elastic client
 * @param {*} config json that contain index name and type to search
 */
module.exports.Search = function (client, config) {
    return new Promise((resolve, reject) => {
        client.msearch({
            body:
                [{ index: config.index, type: config.type },
                { query: { match_all: {} } }]
        },(err,res) =>{
            if(err) return reject(err)
            else {
                return resolve(res.responses)
            }
        })
    })
}
