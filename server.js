var express = require('express');
var app = express();
var url = require('url');
var Socrata = require('node-socrata');
var BodyParser = require('body-parser');

var PRODUCTION = (process.env.ENVIRONMENT === 'production');


if(!PRODUCTION){
  // load environment variables from .env file
  require('node-env-file')(__dirname + '/.env');
}

// access our data store (Socrata)
var database = new Socrata({
  hostDomain: process.env.HOST_DOMAIN || 'https://brigades.opendatanetwork.com',
  resource:   process.env.RESOURCE    || 'ikiz-kvvr',
  XAppToken:  process.env.SOCRATA_APP_TOKEN,
  username:   process.env.SOCRATA_USERNAME,
  password:   process.env.SOCRATA_PASSWORD
});

// parse JSON-format submitted data
app.use(BodyParser.json());

if(PRODUCTION){
  // serve static assets
  app.use(express.static(__dirname + '/dist'));
}

/*

API Proposal:

GET /states/:state_code/precincts => List of all precincts in state
GET /states/:state_code/precincts/:id => Precinct info and latest wait time
GET /states/:state_code/precincts/:id/wait_times => List of all reported wait times
POST /states/:state_code/precincts/:id/wait_times => Report a new wait time

*/

// app.param(['state', 'precinct'], function(req, res, next))


// ?where=precinct%3D55+AND+state+%3D+'GA'
app.get('/waittimes', function(req, res){

  // var queryString = url.parse(req.url, true).search;

  // console.log(queryString);

  console.log(req.query);
  database.get(req.query, function(err, response, data){

    if(err){
      console.log(err.entity);
      res.json(err.entity);
    }else{
      res.json(data);
    }
  })
});

app.post('/waittimes', function(req, res){

  console.log(req.body);

  database.post(req.body, function(err, response, record){
    if(err){
      console.log(err.entity);
      res.json(err.entity);
    }else{
      res.json(record);
    }
  });
});

var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log("server listening on "+port);
});

module.exports = app;