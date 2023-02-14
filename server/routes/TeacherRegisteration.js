const express = require("express");
const router = express.Router();
const Teacher = require("./../models/teacher.js");

router.post("/" , function(req , res) {
    const teacher = new Teacher({
        name : req.body.name , 
        email : req.body.email , 
        password : req.body.password ,
        phone : req.body.phone , 
    });
    teacher.save()
    .then((results) => {
        res.send(results);
    })
    .catch((err) => console.log(err));
});

module.exports = router;    