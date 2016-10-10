var express = require('express');
var api = express.Router();
var request = require('request');
var config = require('./config.js')

api.post('/', function(req, res) {
  request.get({
    url: 'https://trackapi.nutritionix.com/v2/search/instant', 
    query: req.body.query,
    headers: config
  }, function(error, response) {
    if (response) res.send(response.body);
  });
});

module.exports = api;