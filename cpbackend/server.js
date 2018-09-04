const express = require('express');
var mongoose = require('mongoose'); 
const app = express(); 
const port = process.env.PORT || 6000;

var mongoDB = 'mongodb://127.0.0.1/cpbook'; 
mongoose.connect(mongoDB); 
mongoose.Promise = global.Promise; 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'MongoDB connection error')); 

app.listen(port, () => console.log(`Listening on port ${port}`)); 
app.get('/', (req, res) => {
	res.send("hello world")
})