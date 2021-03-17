var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
const { convertValueToUpperCase } = require('../utils/utilityFunctions.js');

var bookSchema = new Schema({
  title: String,
  displayTitle: String,
  url: String,
  author: String,
})

bookSchema.pre('save', function(next) {
  let book = this; 
  this.displayTitle = convertValueToUpperCase(book.title); 
  next();
})

module.exports = mongoose.model('Book', bookSchema);