const express = require("express");


// Initialization

const booky = express();


// Database
const database = require("./database");

/*
Route               /
Description         Get all books
Access              PUBLIC
Parameters          NONE
Methods             GET
*/

booky.get("/",(req,res) =>{
    return res.json({books: database.books});
    
});

/*
Route               /is
Description         Get  specific books based on ISBN
Access              PUBLIC
Parameters          isbn
Methods             GET
*/

booky.get("/is/:isbn", (req, res) =>{
    const getSpecificBook = database.books
    .filter((book) => book.ISBN === req.params.isbn);

    if(getSpecificBook.length===0) {
        return res.json ({error: `No book for ISBN ${req.params.isbn}`});

    }
    return res.json({book: getSpecificBook});
});

/*
Route               /c
Description         Get specific books based on category
Access              PUBLIC
Parameters          category
Methods             GET
*/

booky.get("/c/:category",( req, res) => {
    const getSpecificBook = database.books
        .filter((book) => book.category.includes(req.params.category)
        );

    
    if(getSpecificBook.length===0) {
        return res.json ({error: `No book for category ${req.params.category}`});

    }// else
    return res.json({book: getSpecificBook});


    
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

booky.get("/author/",(req, res) => {
    return res.json({authors: database.author });
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

booky.get("/author/book/:isbn",(req,res) =>
    {
        const getSpecificAuthor = database.author
        .filter((author) =>author.books.includes(req.params.isbn));

        if (getSpecificAuthor===0) {
            return res.json(
                {
                    error: `No author for book of ${req.params.isbn}`,
                }         
            );
        }
        return res.json( {
            authors : getSpecificAuthor
        });  

    }

);

/*
Route               /publications
Description         Get all publications
Access              PUBLIC
Parameters          NONE
Methods             GET
*/

booky.get("/publication",(req, res) => 
{
    return res.json(
        {publication: database.publication}
    );
} );



booky.listen(3000, () =>
    console.log("server setup done"));