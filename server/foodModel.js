var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
  name: String,
  url: String
});

module.exports = mongoose.model('Diary', EntrySchema)