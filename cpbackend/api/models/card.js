var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var cardSchema = new Schema({
  body: String,
  title: String,
})

module.exports = mongoose.model('Card', cardSchema);