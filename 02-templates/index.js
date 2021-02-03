const express = require("express");

// setup hbs
const hbs = require("hbs");

let app = express();

//Telling express we are using HBS as our template engine

app.set("view engine", "hbs");

app.get("/", (req,res)=>{
    res.render("index.hbs");
})



app.listen(3000, ()=>{
    console.log("Sever Started")

})
