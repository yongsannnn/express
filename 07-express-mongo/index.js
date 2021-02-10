//Setup Starts
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require("./MongoUtil");
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

async function main(){
    let db = await MongoUtil.connect(mongoUrl, "food_recipes")

    app.get("/ingredients/create", (req,res)=>{
        res.render("ingredients/create")
    })

    app.post("/ingredients/create",async (req,res)=>{
        await db.collection("recipes").insertOne({
            "name" : req.body.ingredientName
        })

        res.send("Ingredient has been added");
    })
}
main();
//Sever Starts
app.listen(3000, () => {
    console.log("server has started")
})