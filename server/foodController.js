var Diary = require('./foodModel.js');

var getDiary = function(req, res, next) {
  Diary.find({}, function(err, entries) {
    res.json(entries);
  });
}

var deleteEntry = function(req, res, next) {
  Diary.remove({_id: req.params.id}, function (err, resp) {
    if (err) console.error(err);
    else res.sendStatus(200);
  });
}

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