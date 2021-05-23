var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
  title: String,
  displayTitle: String,
  url: String,
  author: String,
})

module.exports = mongoose.model('Book', bookSchema);