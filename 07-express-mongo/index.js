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

async function main() {
    let db = await MongoUtil.connect(mongoUrl, "food_recipes")

    //Show the form to create the ingredient
    app.get("/ingredients/create", (req, res) => {
        res.render("ingredients/create")
    })

    // Actually process the form to create the ingredient
    app.post("/ingredients/create", async (req, res) => {
        await db.collection("ingredients").insertOne({
            "name": req.body.ingredientName
        })

        res.send("Ingredient has been added");
    })

    //Show al the ingredient in the system
    app.get("/ingredients", async (req, res) => {
        let ingredients = await db
            .collection("ingredients") //select the ingredients collection
            .find({}) // find all the ingredient with no criteria
            .toArray(); // convert to array
        console.log(ingredients)
        res.render("ingredients/all", {
            "everything": ingredients
        });
    })

    // Delete ingredient from the system
    app.get("/ingredients/:ingredient_id/delete", async (req, res) => {
        let id = req.params.ingredient_id
        let ingredient = await db.collection("ingredients").findOne({
            "_id": ObjectId(id)
        })
        // test to ensure it's working
        res.render("ingredients/delete", {
            "ingredient": ingredient
        })
    })

    // process what is sent via the form
    app.post("/ingredients/:ingredient_id/delete", async (req, res) => {
        await db.collection.apply("ingredients").remove({
            "id": ObjectId(req.params.ingredient_id)
        })
        res.redirect("/ingredients")
    })



    // update
    app.get('/ingredients/:ingredient_id/update', async (req, res) => {
        // we retrieve the ingredient information
        let ingredient_id = req.params.ingredient_id;
        let ingredient = await db.collection('ingredients').findOne({
            '_id': ObjectId(ingredient_id)
        });

        res.render('ingredients/update', {
            'ingredient': ingredient
        })
    })

    app.post('/ingredients/:ingredient_id/update', async (req, res) => {
        let newIngredientName = req.body.ingredientName;
        let ingredientId = req.params.ingredient_id;
        db.collection('ingredients').updateOne({
            '_id': ObjectId(ingredientId)
        }, {
            '$set': {
                'name': newIngredientName
            }
        });

        res.redirect('/ingredients')
    })

}

main();
//Sever Starts
app.listen(3000, () => {
    console.log("server has started")
})