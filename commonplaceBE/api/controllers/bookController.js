const mongoose = require('mongoose'); 
const Book = require('../models/book');
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
    let book = new Book(req.body.book); 
    await book.save(err => {
      if (err) {
        console.log(err);
        return res.status(400).send({
          status: "error",
          data: {},
          message: undefined,
          error: "Error Saving Book"
        })
      } else {
        return res.status(200).send({
          status: "ok",
          data: book,
          message: "Book Saved",
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
      error: "Error Saving Book"
    })
  }
}