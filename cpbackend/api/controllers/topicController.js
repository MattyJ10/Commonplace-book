const mongoose = require('mongoose'); 
const Topic = require('../models/topic');
const ObjectId = require('mongoose').Types.ObjectId;

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
    let topic = new Topic(req.body.topic); 
    await topic.save(err => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          status: "error",
          data: {},
          message: undefined,
          error: "Error Saving Topic"
        })
      } else {
        return res.status(200).send({
          status: "ok",
          data: topic,
          message: undefined,
          error: undefined
        })
      }
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