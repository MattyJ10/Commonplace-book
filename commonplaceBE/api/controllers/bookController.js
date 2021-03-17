const Book = require('../models/book');
const Card = require('../models/card'); 
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getBooks = async function(req, res) {
  let books;
  try {
    books = await Book.find({});
    return res.status(200).send({
      status: "ok",
      data: books,
      message: undefined,
      error: undefined
    })
  } catch(e) {
    console.log("ERROR GETTING BOOKS"); 
    console.log(e); 
    return res.status(400).send({
      status: "error",
      data: {},
      message: undefined,
      error: "Error Getting Books"
    })
  }
}

module.exports.addBook = async function(req, res) {
  try {
    let book;
    console.log(req.body.isEdit); 
    let isEdit = req.body.isEdit; 
    if (isEdit) {
      book = req.body.book;
    } else {
      book = new Book(req.body.book);
    }
    await Book.updateOne({ _id: new ObjectId(book._id)}, {$set: book}, {upsert: true});
    if (isEdit) {
      let bookCopy = JSON.parse(JSON.stringify(book));
      delete bookCopy._id;
      delete bookCopy.__v;
      await Card.update({ "book._id": new ObjectId(book._id)}, {$set: bookCopy})
    }
    return res.status(200).send({
      status: "ok",
      data: {book, isEdit},
      message: "Book Saved",
      error: undefined,
    })
  } catch (e) {
    console.log(e); 
    return res.status(400).send({
      status: "error",
      data: {},
      message: undefined,
      error: "Error Saving Book"
    })
  }
}

module.exports.deleteBook = async function(req, res) {
  try {
    let id = req.params.id;
    await Book.findByIdAndRemove({_id: new ObjectId(id)}); 
    return res.status(200).send({
      status: "ok",
      data: id,
      message: "Book Deleted",
      error: undefined
    })
  } catch(err) {
    console.log(err); 
    return res.status(400).send({
      status: "error",
      data: {},
      message: undefined,
      error: "Error Deleting Book"
    })
  }
}