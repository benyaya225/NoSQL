// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
var elastic = require('./elastic');
var client = require('./Connexion')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
  res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here
router.get('/loadData', function (req, res) {
  elastic.readData()
    .then((resul) => {
      elastic.AddData(resul, client)
        .then((resul2) => {
          client.indices.putMapping({
            index: "inspectionsrestaurant",
            type: "inspectionrestaurant",
            body: {
              "properties": {
                "restaurant": {
                  "properties": {
                    "title": {
                      "fielddata": true,
                      "type" : "text"
                    },
                    "borough": {
                      "fielddata": true,
                      "type" : "text"
                    },
                    "cuisineType": {
                      "fielddata": true,
                      "type" : "text"
                    }
                  }
                }
              }
            }

          })
          res.send(resul2)
        })
        .catch((err) => { console.log("ERROR OCCURED : " + err) })
    })
    .catch((err) => {
      res.send(err)
    })
})

/**
 * Delete an index
 */
router.get('/delete/:index', function (req, res) {
  elastic.DeleteIndex(req.params.index, client)
    .then((result) => {
      res.send(result)
      console.log(result)
    })
    .catch((err) => {
      console.log(err)
      res.send(err)
    })
})

/**
 * Retrieve all inspections_restaurant from elasticSearch
 */
router.get('/:index/:type', function (req, res) {
  var config = { index: req.params.index, type: req.params.type }
  elastic.Search(client, config)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      res.send(err)
    })
})

router.get('/restaurants', function (req, res) {
  console.log(req.query)
  var elasticQuery = {};
  if (req.query.page) {
    elasticQuery.from = req.query.page
  }
  if (req.query.sort) {
    elasticQuery.sort = [{ [req.query.sort]: { order: "asc" } }]
  }
  var search = req.query;
  if (Object.keys(search).length > 1) {
    var match = []
    for (name in search) {
      if (name != "page" && search[name] != "" && search[name] != "sort") {
        var sear = { match: { [name]: search[name] } }
        match.push(sear);
      }
    }
    elasticQuery.query = {
      bool: {
        must: match
      }
    }
  } else {
    if (req.query.page) {
      elasticQuery = {
        from: req.query.page * 10
      }
    } else {
      if (req.query.sort) {
        elasticQuery = {
          sort: {
            [req.query.sort]: { order: "asc" }
          }
        }
      }
      else {
        elasticQuery = {
          query: {
            match: search
          }
        }
      }
    }
  }

  query = JSON.stringify(elasticQuery);
  console.log(query)
  client.search({
    index: 'inspectionsrestaurant',
    type: 'inspectionrestaurant',
    body: query
  }, function (error, response) {
    console.log(response)
    res.send(response)
  });
})
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
