var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var topicSchema = new Schema({
  topic: String,
  displayTopic: String,
})

module.exports = mongoose.model('Topic', topicSchema);