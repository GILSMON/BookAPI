const books = [
    {
        ISBN : "123Book",
        title : "Learn MERN",
        pubDate: "2021-07-07",
        language: "mal",
        numPage: 250,
        author: [1,2],
        publication:[1],
        category:["tech", "progrm", "education"]

    },
];

const author = [
    {
        id : 1,
        name : "Gilsmon",
        books:["123Book", "lifeofgilsmon"],

    },
    {
        id : 2,
        name : "MarkZu",
        books:["123Book", "lifeofzu"],
    },
    {
        id : 3,
        name : "john",
        books:[],
    }
];

const publication = [
    {
        id : 1,
        name: "writex",
        book: ["123Book"],
    },
];

module.exports = {books, author, publication};