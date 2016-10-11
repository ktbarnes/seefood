var express = require('express');
// var config = require('./config.js');
var request = require('request');
var bodyParser = require('body-parser');
var foodController = require('./foodController.js');
var mongoose = require('mongoose');

var app = express();

// connect to mongo database named 'seefood'
// 
// 
// if (MONGODB_URI) mongoose.connect('mongodb://MONGODB_URI');
mongoose.connect('mongodb://localhost/seefood');

app.use(bodyParser.json());
app.use(express.static('./client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/client/index.html');
});

app.get('/diary', foodController.getDiary);

app.post('/diary', foodController.addToDiary);

app.delete('/diary', foodController.deleteEntry);

app.post('/', function(req, res) {
  // console.log('inside post', req.body.food);
  request.get({
    url: 'https://trackapi.nutritionix.com/v2/search/instant?query='+JSON.stringify(req.body.food), 
    headers: { 'x-app-id': x-app-id, 'x-app-key': x-app-key, 'x-remote-user-id': x-remote-user-id} || require('./config.js')
  }, function(error, response) {
    res.send(response.body);
    res.end();
  });
});

app.listen(process.env.PORT || 8000);

