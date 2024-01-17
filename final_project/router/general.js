const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();
const axios = require('axios');
const fs = require('fs/promises');


// public_users.post("/register", (req,res) => {
//   //Write your code here
  

//   return res.status(300).json({message: "Yet to be implemented"});
// });

// Get the book list available in the shop
public_users.get('/', async (req, res) => {
  //Write your code here
   return res.send(JSON.stringify(books,null,4));
    //return res.status(300).json({message: "Yet to be implemented"});
});

//async function for getting list of Books

async function getListOfBooks(filePath) {
  try {
    //Read the file asynchronously 
    const data = await fs.readFile(filePath,'utf-8');

    //parse the file content as JSON (assuming it contains an array of books)
    const books = JSON.parse(data);
    return books;
  }catch (error) {
    console.error('Error reading or parsing the file:',error.message);
    throw error;
  }
}

const filePath = 'books';// Replace with your actual file path
getListOfBooks(filePath).then(books => console.log('List of books:',booksList)).catch(error => console.error('Error:',error.message));

// Get book details based on ISBN
public_users.get('/isbn/:isbn',async(req, res) => {
  //Write your code here
  const isbn = req.params.isbn;

  // Query your database to find the book with the specified ISBN 
      //find the book with the specified ISBN

      //console.log(Object.entries(books).map(b => b[1]).map(b => b.author));

      const mybook = Object.entries(books).map(b => b[1]).filter(b => b.isbn === isbn);

      //.filter(book => book.isbn == "978-1234567890"));
      //const mybook = books.find(mybook => mybook.isbn === isbn);
        if(mybook){
           res.json(mybook);
        }
       else {
         res.status(404).json({error:'Book not found in the database'});
        }
  
    // return res.status(300).json({message: "Yet to be implemented"});

 });

 async function getBooksByISBN(isbn) {
  try {
    const books = await books.getBooksByISBN(isbn);

    console.log('Books based on ISBN:',books);
    return books;
  }catch (error) {
    // Handle errors
    console.error('Error fatching books by ISBN:', error.message);
       throw error;
  }
 }
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const mybook = Object.entries(books).map(b => b[1]).filter(b => b.author === author);
  //return res.status(300).json({message: "Yet to be implemented"});
  if(mybook){
    res.json(mybook);
 }
else {
  res.status(404).json({error:'Book not found in the database'});
 }
});


async function getBooksByAuthor(author) {
    try{
       const books = await database.getBooksByAuthor(author);

       console.log(`Books by ${author}:`,books);
        
       return books;
    }catch (error) {
         console.error('Error fetching books by author: ', error.message);
         throw error;
    }
}
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const mybook = Object.entries(books).map(b => b[1]).filter(b => b.title === title);
  //return res.status(300).json({message: "Yet to be implemented"});
  if(mybook){
    res.json(mybook);
 }
else {
  res.status(404).json({error:'Book not found in the database'});
 }
});


async function getBooksByTitle(title)
{
  
  try{
    const bookslist = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

    console.error('Error fetching books by title:',error.message);
       throw error;
  }catch (error) {
    
  }
}


//  Get book review
public_users.get('/review/:isbn',function (req, res) {

  const review = req.params.review;
  const mybook = Object.entries(books).map(b => b[1]).filter(b => b.review === review);
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  if(mybook){
    res.json(mybook);
 }
else {
  res.status(404).json({error:'Book not found in the database'});
 }

});

module.exports.general = public_users;
