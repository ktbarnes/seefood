var mongoose = require('mongoose');

// Create the entry schema for the diary in the database
var EntrySchema = new mongoose.Schema({
  name: String,
  url: String
});

module.exports = mongoose.model('Diary', EntrySchema);