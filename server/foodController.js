var Diary = require('./foodModel.js');

var getDiary = function(req, res, next) {
  console.log('inside foodController.getDiary');
  Diary.find({}, function(entries) {
    console.log('finding entries inside foodController.getDiary', entries);
    res.json(entries);
  });
}

var deleteEntry = function(req, res, next) {
  var entry = {
    name: req.body.name,
    url: req.body.url
  };
  Diary.remove(entry, function (err) {
    if (err) console.error(err);
  });
}

var addToDiary = function(req, res, next) {
  var entry = {
    name: req.body.name,
    url: req.body.url
  };
  Diary.create(entry, function (err) {
    if (err) console.error(err);
    else console.log("saved entry");
  });
}

module.exports = {
  getDiary: getDiary,
  deleteEntry: deleteEntry,
  addToDiary: addToDiary
}