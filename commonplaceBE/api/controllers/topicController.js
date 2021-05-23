const Topic = require('../models/topic');
const Card = require('../models/card'); 
const ObjectId = require('mongoose').Types.ObjectId;
const { convertValueToUpperCase } = require('../utils/utilityFunctions.js');

module.exports.getTopics = async function(req, res) {
  let topics;
  try {
    topics = await Topic.find({});
    return res.status(200).send({
      status: "ok",
      data: topics,
      message: undefined,
      error: undefined
    })
  } catch(e) {
    console.log("ERROR GETTING TOPICS"); 
    console.log(e); 
    return res.status(400).send({
      status: "error",
      data: {},
      message: undefined,
      error: "Error Getting Topics"
    })
  }
}

module.exports.addTopic = async function(req, res) {
  try {
    let topic;
    let isEdit = req.body.isEdit;
    if (isEdit) {
      topic = req.body.topic;
    } else {
      topic = new Topic(req.body.topic);
    }
    topic['displayTopic'] = convertValueToUpperCase(topic['topic']);
    await Topic.updateOne({ _id: new ObjectId(topic._id)}, {$set: topic}, {upsert: true});
    if (isEdit) {
      let topicCopy = JSON.parse(JSON.stringify(topic));
      delete topicCopy._id;
      delete topicCopy.__v;
      await Card.update({ "topic._id": new ObjectId(topic._id)}, {$set: {topic: topic}});
    }
    return res.status(200).send({
      status: "ok",
      data: {topic, isEdit},
      message: "Topic Saved",
      error: undefined,
    })
  } catch (e) {
    console.log(e); 
    return res.status(400).send({
      status: "error",
      data: {},
      message: undefined,
      error: "Error Saving Topic"
    })
  }
}

module.exports.deleteTopic = async function(req, res) {
  try {
    let id = req.params.id;
    await Topic.findByIdAndRemove({_id: new ObjectId(id)}); 
    await Card.update({ "topic._id": new ObjectId(id)}, {$unset: {topic: 1}}); 
    return res.status(200).send({
      status: "ok",
      data: id,
      message: "Topic Deleted",
      error: undefined
    })
  } catch(err) {
    console.log(err); 
    return res.status(400).send({
      status: "error",
      data: {},
      message: undefined,
      error: "Error Deleting Topic"
    })
  }
}