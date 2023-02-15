const express = require("express");
const router = express.Router();
const Class = require("./../models/class.js");

async function CheckClassCode(code) {
    const classes = Class.find({code : code});
    return classes;
}

// TODO - async function for class enrollment

router.post("/create/" , async(req , res) =>{
    const classres = await CheckClassCode(req.body.code);
    if(classres.length)
        res.send("Class with the code already exists").status(500);
    else {
        const newclass = new Class({
            title : req.body.title ,
            code : req.body.code
        });
        newclass.save()
        .then((result) => {res.send(result).status(200)})
        .catch((err) => {console.log(err)});
    }
});

module.exports = router;