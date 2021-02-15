//Setup Starts
const express = require('express');
const cors = require("cors")
require("dotenv").config();

const MongoUtil = require("./MongoUtil");
const mongoUrl = process.env.MONGO_URL;

let app = express();
const ObjectId = require("mongodb").ObjectId

app.use(cors());

// Enable processing JSON data
app.use(express.json());
//Setup Ends

async function main() {
    let db = await MongoUtil.connect(mongoUrl, "food_sightings");

    //after this point database is available
    // Create New Sightings
    app.post("/free_food_sighting", async (req, res) => {
        //Document must have
        // description : A brief of what the free food
        // food : an Array of short phrases about what the free food 
        // datetime: when is it sighted
        let description = req.body.description;
        let food = req.body.food;
        let datetime = req.body.datetime || new Date();

        // tell mongo to insert the document
        let results = await db.collection("free_food_sightings").insertOne({
            description: description,
            food: food,
            datetime: datetime
        })
        res.send(results)
    })

    // Reading all Sightings
    app.get("/free_food_sighting", async (req, res) => {
        let results = await db.collection("free_food_sightings").find({}).toArray()
        res.send(results)
    })

    // Deleting Sightings
    app.delete("/food_sighting_record/:id", async (req, res) => {
        let results = await db.collection("free_food_sightings").remove({
            _id: ObjectId(req.params.id)
        });
        res.send({ "Status": "Completed" })
    })

    // Updating Sightings
    app.put("/food_sighting_record/:id", async (req, res) => {
        let description = req.body.description;
        let food = req.body.food;
        let datetime = req.body.datetime || new Date();
        let results = await db.collection("free_food_sightings").updateOne({
            _id: ObjectId(req.params.id)
        }, {
            "$set": {
                description: description,
                food: food,
                datetime: datetime
            }
        })
        res.send(results);
    })
}

main()

//Sever Starts
app.listen(3000, () => {
    console.log("server has started")
})