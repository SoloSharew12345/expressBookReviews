const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const doesExist = (username) => {
  return users.filter(u => u.username === username).length > 0;
}

regd_users.post("/register", (req,res) => {
  //Write your code here

  const username = req.body.username;
  const password = req.body.password;

    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    }
    return res.status(404).json({message: "Unable to register user."});
});

// const isValid = (username)=>{ //returns boolean
// //write code to check is the username is valid
// const username = req.body.username;
// const password = req.body.password;
  
//     if (username && password) {
//       if (!doesExist(username)) { 
//         users.push({"username":username,"password":password});
//         return res.status(200).json({message: "User successfully registred. Now you can login"});
//       } else {
//         return res.status(404).json({message: "User already exists!"});    
//       }
//     } 
//     return res.status(404).json({message: "Unable to register user."});
// }

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.

let validusers = users.filter((user)=>{
  return (user.username === username && user.password === password)
});

if(validusers.length > 0){
  return true;
} else {
  return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/author/review/:isbn", (req, res) => {
  //Write your code here
    const isbn = req.params.isbn;
    //const {userId} = req.body;
    const username = req.body.username;
    const review = req.body.reviews;

  //find the user with the specified userId
  console.log("Users: ", users);
  let user = users.find(user => user.username === username);
  console.log("USER: ", user);
      
      /*
       if(!user){
        // If user doesn't exist, creat a new user
        user = { username, reviews: []};
        users.push(user);
       }
        */
       // Check if the user already has a review for the given ISBN
       // const existingReviewIndex = user.reviews.findIndex(entry => entry.isbn === isbn);
      
       
        // Add a new review entry 
        user.reviews = review;
        console.log(user);
       
       res.json({message: 'Review update successfully', review});

  //return res.status(300).json({message: "Yet to be implemented"});

});

regd_users.delete("/author/review/:isbn", (req, res) => {
  //Write your code here
    const isbn = req.params.isbn;
    //const {userId} = req.body;
    const username = req.body.username;
    const review = {};

  //find the user with the specified userId
  console.log("Users: ", users);
  let user = users.find(user => user.username === username);
  console.log("USER: ", user);
      
      /*
       if(!user){
        // If user doesn't exist, creat a new user
        user = { username, reviews: []};
        users.push(user);
       }
        */
       // Check if the user already has a review for the given ISBN
       // const existingReviewIndex = user.reviews.findIndex(entry => entry.isbn === isbn);
      
       
        // Add a new review entry 
        user.reviews = review;
        console.log(user);
       
       res.json({message: 'Review deleted successfully',user,review});

  //return res.status(300).json({message: "Yet to be implemented"});

});





module.exports.authenticated = regd_users;
//module.exports.isValid = isValid;
module.exports.users = users;
