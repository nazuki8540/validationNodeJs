var express = require("express");
var app = express();
const session = require("express-session");
var flash = require("express-flash");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");


app.set('view engine','ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser("dasdsd!asdav"))

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

app.use(flash());

app.get("/",(req,res) =>{

    var emailError = req.flash("emailError");
    var pontosError = req.flash("pontosError");
    var nomeError = req.flash("nomeError");
    var email = req.flash("email");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    email = (email == undefined || email.length == 0)? "" : email;
    res.render("index",{emailError,pontosError,nomeError,email : email});
})

app.post("/form",(req,res)=> {
    var {email, nome, pontos} = req.body;

    var emailError;
    var pontosError;
    var nomeError;

    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ir vazio";
    }

    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ir vazio";
    }

    if(nome.length < 4){
        nomeError = "nome pequeno";
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Não pode ter menos que 20 pontos";
    }

    if(emailError != undefined || pontosError != undefined || nomeError != undefined){
        req.flash("emailError", emailError);
        req.flash("pontosError",pontosError);
        req.flash("nomeError",nomeError);

        req.flash("email", email);

        res.redirect("/");
    }else{
        res.send("show deu boa");
    }

});

app.listen(3580,(req,res) => {
    console.log("servidor rodando!");
});

