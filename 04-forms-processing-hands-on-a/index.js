// Setup Starts
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

let app = express();
app.set('view engine', 'hbs'); // Tell express to use HBS as view engine

wax.on(hbs.handlebars); // For template inheritance
wax.setLayoutPath('./views/layouts') //Telling wax-on where to find the layout file

app.use(express.static('public')); //Tell Express where to find static files(css,json)
 
//Important line, without this the form will return undefined
app.use(express.urlencoded({
    extended: false
}))

// Setup Ends
// Route Starts
// First Route to display the form
app.get('/bmi', (req,res)=>{   
    res.render('bmi')
})
// First Route to prcess the form
app.post("/bmi", (req,res)=>{
    let height = req.body.height
    let weight = req.body.weight
    console.log(height,weight)
    let bmi = weight / height**2
    res.send(`Your BMI is ${bmi.toFixed(2)}.`)
})
// Route Ends
// Sever Starts
app.listen(3000, ()=>{
    console.log("server has started")
})