// dot env for security
require("dotenv").config();

const express = require("express");

//  database
const mongoose = require("mongoose");

// models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

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

booky.get("/", async (req, res) => {
  // mongodb
  const getAllBooks = await BookModel.find();

  return res.json(getAllBooks);
});

/*
Route               /is
Description         Get  specific books based on ISBN
Access              PUBLIC
Parameters          isbn
Methods             GET
*/

booky.get("/is/:isbn", async (req, res) => {
  // mongodb method
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

  // our database method
  // const getSpecificBook = database.books.filter(
  //   (book) => book.ISBN === req.params.isbn
  // );

  if (!getSpecificBook) {
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

booky.get("/c/:category", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({
    category: req.params.category,
  });

  // const getSpecificBook = database.books.filter((book) =>
  //   book.category.includes(req.params.category)
  // );

  if (!getSpecificBook) {
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

booky.get("/author/", async (req, res) => {
  const getAllAuthor = await AuthorModel.find();
  return res.json({ authors: getAllAuthor });
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
booky.post("/book/add", async (req, res) => {
  const { newBook } = req.body; //destructuring

  BookModel.create(newBook);
  return res.json({
    message: "book was added",
  });
});

/*
Route               /author/add
Description         add new author
Access              PUBLIC
Parameters          NONE
Methods             POST
*/

booky.post("/author/add", async (req, res) => {
  const { newAuthor } = req.body;

  AuthorModel.create(newAuthor);
  return res.json({
    message: "new author is added",
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

booky.put("/book/update/title/:isbn", async (req, res) => {
  // mongoose
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn, // find the book
    },
    {
      title: req.body.newBookTitle, // update the book title
    },
    {
      new: true, // to return new value
    }
  );
  return res.json({ books: updatedBook });
});

/*
Route               /book/update/author
Description         update/add new author for a book
Access              PUBLIC
Parameters          isbn
Methods             PUT 
*/

booky.put("/book/update/author/:isbn", async (req, res) => {
  //update book database

  // mongoose
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: {
        author: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );
  // update author database
  // mongoose

  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );
  return res.json({ books: updatedBook, author: updatedAuthor });
});


  // database.books.forEach((book) => {
  //   if (book.ISBN === req.params.isbn) {
  //     return book.author.push(req.body.newAuthor);
  //   }
  // });
  //   database.author.forEach((author) => {
  //     if (author.id === parseInt(req.params.authorId))
  //       return author.books.push(req.params.isbn);
  //   });

/*
Route               /book/delete
Description         delete a book
Access              PUBLIC
Parameters          isbn
Methods             DELETE
*/


booky.listen(3000, () => console.log("server setup done"));

// MONGOOSE : CONVERT JAVASCRIPT INTO mongoDB underrstandable language
