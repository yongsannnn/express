// including a dependency
const express = require("express");

// create new express app
let app = express();

// Add in a route
// All your route must be before app.listen
// maps a URL to a JavaScript Function such that when the URL is access on the sever, the function will execute. (Pairing)
app.get("/", function(request,response){
    //Use the response object to send data back to the client
    response.send("Hello World")
})

// the "/" is routing to that specific url, similar to folder directory. 
app.get("/about-us", function(request,response){
    response.send(` <h1> About Us </h1> `)
})

app.get("/contact-us",(req,res)=>{
    res.send(`<h2> Contact Us </h2>`)
})

app.get("/greeting/:fullname",(req,res)=>{
    let fullname = req.params.fullname;
    res.send(`<h2> Hi ${fullname} </h2>`)
})

// Practice Q1 square the number x when reaching this directory.
app.get("/squared/:x",(req,res)=>{
    let num = req.params.x;
    num = num * num
    res.send(`<h2> The number is: ${num} </h2>`)
})

//Two number param with url being /sum. Send the response as the sum or the number
app.get("/sum/:a/:b",(req,res)=>{
    let num1 = req.params.a;
    let num2 = req.params.b
    let sum = parseFloat(num1) + parseFloat(num2)
    res.send(`<h2> The number is: ${sum} </h2>`)
})

//starts at the sever at port 3000
app.listen(3000, ()=>{
    console.log("Sever has started")
})