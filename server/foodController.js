var Diary = require('./foodModel.js');

var getDiary = function(req, res, next) {
  // console.log('inside foodController.getDiary');
  Diary.find({}, function(err, entries) {
    console.log('finding entries inside foodController.getDiary', entries);
    res.json(entries);
  });
}

var deleteEntry = function(req, res, next) {
  // console.log('inside foodController.deleteEntry', req.body)
  Diary.remove({_id: req.body._id}, function (err, resp) {
    if (err) console.error(err);
    else res.sendStatus(200);
  });
}

var addToDiary = function(req, res, next) {
  console.log('inside foodController.addToDiary',req.body);
  var entry = {
    name: req.body.name,
    url: req.body.url
  };
  Diary.create(entry, function (err, resp) {
    // console.log('line 29+++++++addToDiary',resp);
    if (err) console.error(err);
    else res.sendStatus(200);
  });
}

module.exports = {
  getDiary: getDiary,
  deleteEntry: deleteEntry,
  addToDiary: addToDiary
}