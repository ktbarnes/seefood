var Diary = require('./diaryModel.js');

// Retrieve food item entries from database
var getDiary = function(req, res, next) {
  Diary.find({}, function(err, entries) {
    res.json(entries);
  });
}

// Delete food item entry from database
var deleteEntry = function(req, res, next) {
  Diary.remove({_id: req.params.id}, function (err, resp) {
    if (err) console.error(err);
    else res.sendStatus(200);
  });
}

// Add food item entry to database
var addToDiary = function(req, res, next) {
  var entry = {
    name: req.body.name,
    url: req.body.url
  };
  Diary.create(entry, function (err, resp) {
    if (err) console.error(err);
    else res.sendStatus(200);
  });
}

module.exports = {
  getDiary: getDiary,
  deleteEntry: deleteEntry,
  addToDiary: addToDiary
}