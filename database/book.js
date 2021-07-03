const mongoose = require("mongoose");

// creating a book schema
const BookSchema = mongoose.Schema({
    ISBN : String,
    title : String,
    pubDate: String,
    language: String,
    numPage: Number,
    author: [Number],
    publication:[Number],
    category:[String]
}); 

// create a book model
const BookModel = mongoose.model(BookSchema);
// to use in other files
module.exports = BookModel;