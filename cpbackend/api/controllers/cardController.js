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
  try {
    let upsert = await Card.updateOne({ _id: new ObjectId(card._id) }, {$set: card}, {upsert: true});
    // console.log(upsert); 
    return res.status(200).send({
      card,
      isEdit
    })
  } catch (e) {
    console.log("Error Saving Card"); 
    console.log(e); 
    return res.status(400).send({
      msg: "Error Saving Card"
    })
  }
  

}

module.exports.getCards = async function(req, res) {
  let cards;
  try {
    cards = await Card.find({});
    return res.status(200).send({
      cards: cards
    })
  } catch(e) {
    console.log("ERROR GETTING CARDS"); 
    console.log(e); 
    return res.status(400).send({
      msg: "Error Getting Cards"
    })
  }
}

module.exports.deleteCard = function(req, res) {
  let id = req.params.id; 
  Card.findByIdAndRemove({_id: new ObjectId(id)}).exec((err, data) => {
    if (err) {
      console.log("ERROR DELETING BUILDING: ", id);
      console.log(err); 
      return res.status(400).send({
        msg: "Error Deleting Building"
      })
    } else {
      return res.status(200).send({
        id
      });
    }
  })
}