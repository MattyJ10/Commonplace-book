const mongoose = require('mongoose'); 
const Card = require('../models/card');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.addCard = async function(req, res) {
  let card;
  let isEdit = req.body.isEdit;
  if (req.body.isEdit) {
    card = req.body.card;
  } else {
    card = new Card(req.body.card);
  }
  console.log(card);
  try {
    await Card.updateOne({ _id: new ObjectId(card._id) }, {$set: card}, {upsert: true});
    let successMessage;
    if (req.body.isEdit) successMessage = "Card Updated";
    else successMessage = "Card Saved";
    return res.status(200).send({
      status: "ok",
      data: {card, isEdit},
      message: successMessage,
      error: undefined
    })
  } catch (e) {
    console.log("Error Saving Card"); 
    console.log(e); 
    return res.status(400).send({
      status: "error",
      data: {},
      message: undefined,
      error: "Error Saving Card"
    })
  }
}

module.exports.getCards = async function(req, res) {
  let cards;
  try {
    cards = await Card.find({});
    return res.status(200).send({
      status: "ok",
      data: cards,
      message: undefined,
      error: undefined
    })
  } catch(e) {
    console.log("ERROR GETTING CARDS"); 
    console.log(e); 
    return res.status(400).send({
      status: "error",
      data: {},
      message: undefined,
      error: "Error Getting Cards"
    })
  }
}

module.exports.deleteCard = function(req, res) {
  let id = req.params.id;
  Card.findByIdAndRemove({_id: new ObjectId(id)}).exec((err, data) => {
    if (err) {
      console.log("ERROR DELETING Card: ", id);
      console.log(err); 
      return res.status(400).send({
        status: "error",
        data: {},
        message: undefined,
        error: "Error Deleting Card"
      })
    } else {
      return res.status(200).send({
        status: "ok",
        data: id,
        message: "Card Deleted",
        error: undefined
      });
    }
  })
}