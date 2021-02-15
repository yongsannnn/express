//Setup Starts
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

//Calling folder for .env file and put it in operating system
require("dotenv").config();
//Now it can be access by process.env 
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require("./MongoUtil");
const ObjectId = require("mongodb").ObjectId;
// create an instance of express app
let app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')
app.use(express.urlencoded({
    extended: false
}))

//Setup Ends

app.get("/api/greetings", (req,res)=>{
    // If you send back a JS object, Express will automatically change it into JSON for you.
    res.send({"message" : "Hello World"})

})


//Sever Starts
app.listen(3000, () => {
    console.log("server has started")
})