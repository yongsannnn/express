//Setup Starts
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
require("dotenv").config();
const mongoUrl = process.env.MONGO_URL;
const MongoUtil = require("./MongoUtil");

let app = express();
//Setup Ends

async function main(){
    let db = await MongoUtil.connect(mongoUrl, "movie_application")
}
main();
//Sever Starts
app.listen(3000, () => {
    console.log("server has started")
})