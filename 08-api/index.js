//Setup Starts
const express = require('express');
const cors = require("cors")
let app = express();

// Enable Forms process
app.use(express.urlencoded({
    extended: false
}))

app.use(cors());

// Enable processing JSON data
app.use(express.json());
//Setup Ends

app.get("/api/greetings", (req,res)=>{
    // If you send back a JS object, Express will automatically change it into JSON for you.
    res.send({"message" : "Hello World"})

})

app.post("/api/sayhello", (req,res)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    res.send({"message" : "Hello there " + firstName + " " + lastName})
})
//Sever Starts
app.listen(3000, () => {
    console.log("server has started")
})