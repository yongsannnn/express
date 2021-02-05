// Setup Starts
const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const axios = require("axios");

let app = express();
app.set('view engine', 'hbs'); // Tell express to use HBS as view engine
wax.on(hbs.handlebars); // For template inheritance
wax.setLayoutPath('./views/layouts') //Telling wax-on where to find the layout file
app.use(express.static('public')); //Tell Express where to find static files(css,json)
app.use(express.urlencoded({
    extended: false
})) // For Forms Processing

const baseURL = "https://ckx-movies-api.herokuapp.com/";
// Setup Ends
// Route Starts

// First Route to display the movies
app.get('/all', async (req, res) => {
    let response = await axios.get(baseURL + "movies")
    console.log(response.data);
    res.render('all', {
        all_movies: response.data
    })
})
// Second Route to see the create new movie form
app.get("/new", (req, res) => {
    res.render("new")
})

// Second Route to post new movie
app.post("/new", async (req, res) => {
    let movieName = req.body.movie
    let plotName = req.body.plot
    let postLoad = {
        title: movieName,
        plot: plotName,
    }
    let response = await axios.post(baseURL + "movie/create", postLoad);
    res.redirect("/all")
})

// Third Route to delete movie
// GET
app.get("/delete/:movieid", async (req, res) => {
    let movieId = req.params.movieid
    let response = await axios.get(`${baseURL}/movie/${movieId}`);
    let movie = response.data
    res.render("delete", {
        deleteMovie: movie
    })
})

// POST & DELETE
app.post("/delete/:movieid", async (req, res) => {
    let movieId = req.params.movieid
    let response = await axios.delete(`${baseURL}/movie/${movieId}`)
    res.redirect("/all");
})

// Fourth Route to edit movie
// GET
app.get("/edit/:movieid", async (req, res) => {
    let movieId = req.params.movieid
    let response = await axios.get(`${baseURL}/movie/${movieId}`);
    let movie = response.data
    res.render("edit", {
        editMovie: movie
    })
})

// POST & EDIT
app.post("/edit/:movieid", async (req, res) => {
    let movieId = req.params.movieid
    let movieName = req.body.movie
    let plotName = req.body.plot
    let postLoad = {
        title: movieName,
        plot: plotName,
    }
    let response = await axios.patch(`${baseURL}/movie/${movieId}`,postLoad)
    res.redirect("/all")
})
///movie/<movie_id>
// Route Ends
// Sever Starts
app.listen(3000, () => {
    console.log("server has started")
})