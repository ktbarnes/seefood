var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var diaryController = require('./diaryController.js');
var mongoose = require('mongoose');

var app = express();

// Connect to mongo database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/visualfood');

// Check if environment variables exist, if not then load API keys from config.js
if (!process.env['x-app-id']) {
 var config = require('./config.js');
} else {
  var config = {
    'x-app-id': process.env['x-app-id'], 
    'x-app-key': process.env['x-app-key'],
    'x-remote-user-id': process.env['x-remote-user-id']
  }
}

// Middleware to parse request body and serve up static assets
app.use(bodyParser.json());
app.use(express.static('./client'));

app.get('/', function(req, res) {
  res.sendFile(__dirname+'/client/index.html');
});

// Route to retrieve food item entries from databasae 
app.get('/diary', diaryController.getDiary);

// Route to post food item entry to database
app.post('/diary', diaryController.addToDiary);

// Route to delete food item entry from database
app.delete('/diary/:id', diaryController.deleteEntry);

// Route to query Nutritionix API for food pictures
app.post('/', function(req, res) {
  request.get({
    url: 'https://trackapi.nutritionix.com/v2/search/instant?query='+JSON.stringify(req.body.food), 
    headers: config
  }, function(error, response) {
    res.send(response.body);
  });
});

// Start the server
app.listen(process.env.PORT || 8000);

