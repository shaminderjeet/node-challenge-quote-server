const { response } = require("express");
// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const fs = require("fs");
const { reset } = require("nodemon/lib/rules");
const app = express();
const lodash = require('lodash');

//load the quotes JSON
const quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes",function(request,response){
  response.send(fs.readFileSync("quotes.json").toString())
})
app.get("/quotes/random",function(request,response){
  //response.send(JSON.stringify(pickFromArray(quotes)))
  response.send(lodash.sample(quotes))
})
app.get("/quotes/search",function(req,res){

  const filteredQuotes=quotes.filter(element=>{
    return element.quote.toLowerCase().includes(req.query.term.toLowerCase())||element.author.toLowerCase().includes(req.query.term.toLowerCase())
  })
  if(filteredQuotes.length==0){
    res.send("Try Something New ")
  }
 else{ res.send(filteredQuotes)
 }
})


//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//Start our server so that it listens for HTTP requests!
let port = 5000;

app.listen( port, function () {
  console.log("Your app is listening on port " + port);
});

// trying git push