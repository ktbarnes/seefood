var express = require('express');
var config = require('./config.js');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(express.static('./client'));

app.get('*', function(req, res) {
  res.sendFile(__dirname+'/client/index.html');
});

app.post('/', function(req, res) {
  request.get({
    url: 'https://trackapi.nutritionix.com/v2/search/instant', 
    query: req.body.query,
    headers: config
  }, function(error, response) {
    if (response) res.send(response.body.common[0]);
  });
});

app.listen(process.env.PORT || 8000);

module.exports = app;