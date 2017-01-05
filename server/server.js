var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var foodController = require('./foodController.js');
var mongoose = require('mongoose');

var app = express();

//connect to mongo database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/visualfood');

//check if running locally or not
if (!process.env['x-app-id']) {
 var config = require('./config.js');
} else {
  var config = {
    'x-app-id': process.env['x-app-id'], 
    'x-app-key': process.env['x-app-key'],
    'x-remote-user-id': process.env['x-remote-user-id']
  }
}

app.use(bodyParser.json());
app.use(express.static('./client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/client/index.html');
});

app.get('/diary', foodController.getDiary);

app.post('/diary', foodController.addToDiary);

app.delete('/diary/:id', foodController.deleteEntry);

app.post('/', function(req, res) {
  request.get({
    url: 'https://trackapi.nutritionix.com/v2/search/instant?query='+JSON.stringify(req.body.food), 
    headers: config
  }, function(error, response) {
    res.send(response.body);
  });
});

app.listen(process.env.PORT || 8000);

