const express=require("express") ;
const hbs = require("hbs");
const wax = require("wax-on");

let app = express();
//SETUP that comes before Route
app.set("view engine", "hbs");
wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");

//SETUP static files
app.use(express.static("public"));

app.get("/food/add", (req,res)=>{
    res.render("add-food")
})

app.post("/food/add", (req,res)=>{
    res.send("Data received.")
    console.log(req.body)
})

// !! Enable forms processing
app.use(express.urlencoded({
    extended: false
}))

app.listen(3000, ()=>{
    console.log("Sever started")
})