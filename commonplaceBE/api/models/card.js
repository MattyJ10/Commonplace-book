var mongoose = require('mongoose');
const Book = require('./book'); 
const Topic = require('./topic'); 
var Schema = mongoose.Schema; 

var cardSchema = new Schema({
  book: Book.schema,
  body: String,
  topic: Topic.schema,
})

module.exports = mongoose.model('Card', cardSchema);