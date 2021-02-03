const express=require("express") ;
const hbs = require("hbs");

let app = express();
app.set("view engine", "hbs")

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render("index.hbs")
})

app.get("/about",(req,res)=>{
    res.render("about.hbs")
})


app.listen(3000, ()=>{
    console.log("Sever started")
})