var Diary = require('./foodModel.js');

var getDiary = function(req, res, next) {
  Diary.find({}, function(entries) {
    res.json(entries);
  });
}

var deleteEntry = function(req, res, next) {

}

var addToDiary = function(req, res, next) {

}

module.exports = {
  getDiary: getDiary,
  deleteEntry: deleteEntry,
  addToDiary: addToDiary
}