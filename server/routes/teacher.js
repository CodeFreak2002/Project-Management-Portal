const express = require("express");
const router = express.Router();
const Teacher = require("./../models/teacher.js");

router.post("/register/" , function(req , res) {
    Teacher.find({email : req.body.email} , function(err , obj) {
        if(obj.length)
            return res.send("Email already registered").status(500);
    })
    .clone()
    .then((results) => {
        if(!results.length) {
            Teacher.find({phone : req.body.phone} , function(err , obj) {
                if(obj.length)
                    return res.send("Phone number already registered").status(500);
            })
            .clone()
            .then((results) => {
                if(!results.length) {
                    const teacher = new Teacher({
                        name : req.body.name , 
                        email : req.body.email , 
                        password : req.body.password ,
                        phone : req.body.phone , 
                    });
                    teacher.save()
                    .then((results) => {
                        return res.send(results);
                    })
                    .catch((err) => console.log(err));
                }
            })
            .catch((err) => {console.log(err)});
        }
    })
    .catch((err) => {console.log(err)});
});

router.post("/login/" , function(req , res) {
    Teacher.find({email : req.body.email} , function(err , obj) {
        if(err) 
            return console.log(err);
        if(!obj.length) 
            return res.send("User does not exit").status(404);
        let TeacherObj = obj[0];
        if(TeacherObj.password === req.body.password)
            return res.send(TeacherObj).status(200);
        return res.send("Incorrect Password").status(500);
    })
    .clone()
    .catch((err) => {console.log(err)});
});

router.get("/profile" , async function(req , res) {
    let teacherObj = await Teacher.findOne({email : req.body.email}).clone();
    try {
        let profile = {
            "name" : teacherObj.name , 
            "email" : teacherObj.email , 
            "phone" : teacherObj.phone
        };
        res.send(JSON.stringify(profile)).status(200);
    } catch(err) {
        console.log(err);
        res.send("Error").status(500);
    }
});

module.exports = router;    