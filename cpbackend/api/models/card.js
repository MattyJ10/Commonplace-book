var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var cardSchema = new Schema({
  book: String,
  body: String,
  topic: String,
})

module.exports = mongoose.model('Card', cardSchema);