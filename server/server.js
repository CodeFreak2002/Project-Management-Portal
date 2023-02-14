const express = require("express");
const app = express();
const port = 8080;
const logger = require("morgan");
const bodyParser = require("body-parser");
const TeacherRegisteration = require("./routes/TeacherRegisteration.js");
const TeacherLogin = require("./routes/TeacherLogin.js");
var util = require('util');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(logger("dev"));
app.use("/TeacherRegisteration" , TeacherRegisteration);
app.use("/TeacherLogin" , TeacherLogin);
var encoder = new util.TextEncoder('utf-8');

const dbURL = 'mongodb+srv://team03:team03_mongo@cluster0.oaiv4hh.mongodb.net/Project-Management?retryWrites=true&w=majority';
const mongoose = require("mongoose");
mongoose.connect(dbURL , {useNewUrlParser: true , useUnifiedTopology : true})
    .then((result) => {
        app.listen(port , function() {
            console.log("Server running\n");
        });
        console.log("Connected to database\n");
    })
    .catch((err) => console.log(err));