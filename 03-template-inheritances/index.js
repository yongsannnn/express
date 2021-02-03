const express=require("express") ;
const hbs = require("hbs");
const wax = require("wax-on");

let app = express();

app.set("view engine", "hbs");

wax.on(hbs.handlebars);
wax.setLayoutPath("./views/layouts");
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.hbs")
})

app.get("/about",(req,res)=>{
    res.render("about.hbs")
})

app.get("/contact",(req,res)=>{
    res.render("contact.hbs")
})

app.listen(3000, ()=>{
    console.log("Sever started")
})