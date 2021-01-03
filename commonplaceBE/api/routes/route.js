const cardController = require('../controllers/cardController.js'); 
const bookController = require('../controllers/bookController.js');
const topicController = require('../controllers/topicController.js'); 

module.exports = function(app, express) {
  let router = express.Router();

  // CARDS
  app.post('/api/addCard', cardController.addCard);
  app.get('/api/getCards', cardController.getCards); 
  app.get('/api/deleteCard/:id', cardController.deleteCard); 

  // BOOKS
  app.get('/api/getBooks', bookController.getBooks);
  app.post('/api/addBook', bookController.addBook);  
  app.delete('/api/deleteBook/:id', bookController.deleteBook);

  // TOPICS
  app.get('/api/getTopics', topicController.getTopics);
  app.post('/api/addTopic', topicController.addTopic); 
  app.delete('/api/deleteTopic/:id', topicController.deleteTopic);
}