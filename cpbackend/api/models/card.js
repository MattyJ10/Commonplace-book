var mongoose = require('mongoose');
const Book = require('../models/book'); 
const Topic = require('../models/topic'); 
var Schema = mongoose.Schema; 

var cardSchema = new Schema({
  book: Book.schema,
  body: String,
  topic: Topic.schema,
})

module.exports = mongoose.model('Card', cardSchema);