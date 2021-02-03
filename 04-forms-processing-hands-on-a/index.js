const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

let app = express();
app.set('view engine', 'hbs');
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')
app.use(express.static('public'));

app.use(express.urlencoded({
    extended: false
}))

app.get('/bmi', (req,res)=>{
    res.render('bmi')
})

app.post("/bmi", (req,res)=>{
    let height = req.body.height
    let weight = req.body.weight
    console.log(height,weight)
    let bmi = weight / height**2
    res.send(`Your BMI is ${bmi.toFixed(2)}.`)
})

app.listen(3000, ()=>{
    console.log("server has started")
})