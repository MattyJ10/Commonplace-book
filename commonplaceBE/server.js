const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
var mongoose = require('mongoose'); 
const app = express(); 
const port = process.env.PORT || 5005;

let whitelist = ['http://localhost:3000']

//Needed to set credentials to true to allow 
let corsOptions = {
  	origin: function (origin, callback) {
    	if (!origin || whitelist.indexOf(origin) !== -1) {
      		callback(null, true)
    	} else {
      		callback(new Error('Not allowed by CORS'))
    	}
  	},
  	credentials: true
}

app.use(cors(corsOptions));
app.use(bodyParser.json()); 

var mongoDB = 'mongodb://127.0.0.1/commonplace'; 
mongoose.connect(mongoDB);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise; 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error')); 

require('./api/routes/route')(app, express); 

app.listen(port, () => console.log(`Listening on port ${port}`)); 