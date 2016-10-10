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
  console.log('inside post', req.body.food);
  request.get({
    url: 'https://trackapi.nutritionix.com/v2/search/instant?query='+ JSON.stringify(req.body.food), 
    headers: config
  }, function(error, response) {
    res.send(response.body);

    // if (error) console.error(error);
    // var stuff = '';
    // response.on('data', function(chunk) {
    //   stuff += chunk;
    // });
    // response.on('end', function() {
    //   console.log(stuff);
    //   response.send(stuff.common[0]);
    // });
    res.end();
  });
});

app.listen(process.env.PORT || 8000);

