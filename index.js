// dot env for security
require("dotenv").config();

const express = require("express");

//  database
const mongoose = require("mongoose");

// Initialization

const booky = express();

// configuring for POSTMAN
booky.use(express.json());

// establish database connection  : check mongoose website
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("connection established"));

// Database
const database = require("./database/index");

/*
Route               /
Description         Get all books
Access              PUBLIC
Parameters          NONE
Methods             GET
*/

booky.get("/", (req, res) => {
  return res.json({ books: database.books });
});

/*
Route               /is
Description         Get  specific books based on ISBN
Access              PUBLIC
Parameters          isbn
Methods             GET
*/

booky.get("/is/:isbn", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );

  if (getSpecificBook.length === 0) {
    return res.json({ error: `No book for ISBN ${req.params.isbn}` });
  }
  return res.json({ book: getSpecificBook });
});

/*
Route               /c
Description         Get specific books based on category
Access              PUBLIC
Parameters          category
Methods             GET
*/

booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter((book) =>
    book.category.includes(req.params.category)
  );

  if (getSpecificBook.length === 0) {
    return res.json({ error: `No book for category ${req.params.category}` });
  } // else
  return res.json({ book: getSpecificBook });
});
/*
Route               /c
Description         Get specific books based on language
Access              PUBLIC
Parameters          language
Methods             GET
*/
// try yourself

/*
Route               /author
Description         Get all authors
Access              PUBLIC
Parameters          NONE
Methods             GET
*/

booky.get("/author/", (req, res) => {
  return res.json({ authors: database.author });
});

/*
Route               /author
Description         Get specific author based on id
Access              PUBLIC
Parameters          
Methods             GET
*/

// your task

/*
Route               /author/book
Description         Get specific author based on books
Access              PUBLIC
Parameters          isbn
Methods             GET
*/

booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );

  if (getSpecificAuthor === 0) {
    return res.json({
      error: `No author for book of ${req.params.isbn}`,
    });
  }
  return res.json({
    authors: getSpecificAuthor,
  });
});

/*
Route               /publications
Description         Get all publications
Access              PUBLIC
Parameters          NONE
Methods             GET
*/

booky.get("/publication", (req, res) => {
  return res.json({ publication: database.publication });
});

/*
Route               /book/add
Description         add new book
Access              PUBLIC
Parameters          NONE
Methods             POST
*/
// using POSTMON
booky.post("/book/add", (req, res) => {
  //   const newBook = req.body.newBook;
  const { newBook } = req.body; //destructuring

  database.books.push(newBook);
  return res.json({
    book: database.books,
  });
});

/*
Route               /author/add
Description         add new author
Access              PUBLIC
Parameters          NONE
Methods             POST
*/

booky.post("/author/add", (req, res) => {
  const { newAuthor } = req.body;

  database.author.push(newAuthor);
  return res.json({
    author: database.author,
  });
});

/*
Route               /publication/add
Description         add new publication
Access              PUBLIC
Parameters          NONE
Methods             POST
*/

// task

/*
Route               /book/update/title/
Description         update book title
Access              PUBLIC
Parameters          isbn
Methods             PUT 
*/

booky.put("/book/update/title/:isbn", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.title = req.body.newBookTitle;
      return;
    }
  });
  return res.json({ books: database.books });
});

/*
Route               /book/update/author
Description         update/add new author for a book
Access              PUBLIC
Parameters          isbn
Methods             PUT 
*/

booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
  //update book database

  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      return book.author.push(parseInt(req.params.authorId));
    }
  });

  // update author database

  database.author.forEach((author) => {
    if (author.id === parseInt(req.params.authorId))
      return author.books.push(req.params.isbn);
  });

  return res.json({ books: database.books, author: database.author });
});

booky.listen(3000, () => console.log("server setup done"));

// MONGOOSE : CONVERT JAVASCRIPT INTO mongoDB underrstandable language
