var express = require('express');
var app = express();
var url = require('url');

var Socrata = require('node-socrata');

// var dataSource = 'https://brigades.opendatanetwork.com/resource/ikiz-kvvr.json';
// var appToken = '7SlEb1MrWlecn6kExGlU4lZhj';
// var basicAuthToken = 'Y2hhcmxlc0ByYWJpZGF1ZGlvLmNvbTpPcDNuRGF0YSE=';

// dataConfig = {
//   hostDomain: 'https://brigades.opendatanetwork.com',
//   resource: 'ikiz-kvvr',
//   XAppToken: '7SlEb1MrWlecn6kExGlU4lZhj',
//   username: 'charles@rabidaudio.com',
//   password: 'Op3nData!'
// }
// var soda = new Socrata(config);

var config = {
  // find a hostDomain from the listSource method
  hostDomain: 'https://brigades.opendatanetwork.com',
  // An accessible API table from the host domain
  resource: 'ikiz-kvvr',
  // Create account and register app https://opendata.socrata.com
  XAppToken: process.env.SOCRATA_APP_TOKEN || '7SlEb1MrWlecn6kExGlU4lZhj',
  username: 'charles@rabidaudio.com',
  password: 'Op3nData!'
};

var soda = new Socrata(config);

app.use(require('body-parser').json())

app.use(express.static(__dirname + '/dist'));


// ?where=precinct%3D55+AND+state+%3D+'GA'
app.get('/waittimes', function(req, res){

  // var queryString = url.parse(req.url, true).search;

  // console.log(queryString);

  console.log(req.query);
  soda.get(req.query, function(err, response, data){

    if(err){
      console.log(err);
      res.status(500).json("err");
      return;
    }

    res.json(data);
  })
});

function toSimpleObject(obj){
  return JSON.parse(JSON.stringify(obj));
}

app.post('/waittimes', function(req, res){

  console.log(req.body);

  soda.post(req.body, function(err, response, record){

    if(err){
      console.log(err);
      res.status(500).json("err");
      return;
    }

    console.log(response);

    res.json(record);

  });
});

app.listen(process.env.PORT || 5000);