var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
const { convertValueToUpperCase } = require('../utils/utilityFunctions.js');

var topicSchema = new Schema({
  topic: String,
  displayTopic: String,
})

topicSchema.pre('save', function(next) {
  let topic = this; 
  this.displayTopic = convertValueToUpperCase(topic.topic); 
  next();
})

module.exports = mongoose.model('Topic', topicSchema);