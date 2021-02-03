const express = require("express");

// setup hbs
const hbs = require("hbs");

let app = express();

//Telling express we are using HBS as our template engine

app.set("view engine", "hbs");

//telling express where to get all the static files name can be any name
// Add a CSS file and change BG to purple
// Add a JS file and alert woof woof
app.use(express.static("public"))

app.get("/", (req,res)=>{
    res.render("index.hbs");
})


app.get("/greeting/:name", (req,res)=>{
    let fullName = req.params.name;
    res.render("greeting.hbs",{
        "fullName" : fullName
    });

})

// Use Math.random function to generate a number between 1 - 1000 and send it to a view file named lucky.hbs and inform the user that is their lucky number. 

app.get("/luckynum",(req,res)=>{
    res.render("luckynum.hbs",{
        "lucky" : (Math.floor(Math.random() * 1000) + 1)
    })
})

app.listen(3000, ()=>{
    console.log("Sever Started")

})
