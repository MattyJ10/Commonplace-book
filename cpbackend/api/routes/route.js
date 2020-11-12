const express = require('express');
const cardController = require('../controllers/cardController.js'); 

module.exports = function(app, express) {
  let router = express.Router();

  app.post('/api/addCard', cardController.addCard);
  app.get('/api/getCards', cardController.getCards); 
  app.get('/api/deleteCard/:id', cardController.deleteCard); 
}