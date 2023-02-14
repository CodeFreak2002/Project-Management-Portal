const express = require("express");
const router = express.Router();
const Teacher = require("./../models/teacher.js");

router.post("/" , function(req , res) {
    Teacher.find({email : req.body.email} , function(err , obj) {
        if(err) 
            return console.log(err);
        if(!obj.length) 
            return res.send("User does not exit").status(300);
        let TeacherObj = obj[0];
        if(TeacherObj.password === req.body.password)
            return res.send(TeacherObj).status(200);
        return res.send("Incorrect Password").status(300);
    })
    .clone()
    .catch((err) => {console.log(err)});
});

module.exports = router;