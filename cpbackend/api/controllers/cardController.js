const mongoose = require('mongoose'); 
const Card = require('../models/card');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.addCard = function(req, res) {
  let newCard = new Card(req.body.card);
  newCard.save(err => {
    if (err) {
      console.log("ERROR ADDING CARD"); 
      console.log(err);
      return res.status(400).send({
        msg: "Error Adding Card"
      })
    } else {
      return res.status(201).send({
        msg: "Card Created",
        card: newCard
      })
    }
  })
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