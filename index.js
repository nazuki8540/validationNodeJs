var express = require("express");
var app = express();
const session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");


app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

app.get("/",(req,res) =>{
    res.render("index");
})

app.listen(3580,(req,res) => {
    console.log("servidor rodando!");
});

