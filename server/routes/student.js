const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Classes = require('../models/class');

router.post('/register', async function(req,res){
    var student = await Student.findOne({email : req.body.email.toString()}).clone();
    if (student)
        return res.status(500).send("Email already registered");
    if (req.body.phone) {
        var student = await Student.findOne({phone : req.body.phone.toString()}).clone();
        if (student)
            return res.status(500).send("Phone already registered");
    }

    var newStudent = new Student({
        name : req.body.name.toString(),
        email : req.body.email.toString(),
        password : req.body.password.toString(),
        phone : req.body.phone.toString(),
    });

    await newStudent.save();
    return res.status(200).send("Registration successful");
});

router.post('/login' , async function(req , res) {
    let student = await Student.findOne({email : req.body.email.toString()}).clone();
    if(student) {
        if(student.password === req.body.password.toString())
            return res.status(200).send(student);
        return res.status(500).send("Invalid Password");
    } 
    return res.status(500).send("Invalid Credentials");
});

router.post("/profile" , async function(req , res) {
    let studentObj = await Student.findOne({email : req.body.email.toString()}).clone();
    try {
        let profile = {
            "name" : studentObj.name.toString() , 
            "email" : studentObj.email.toString() , 
            "phone" : studentObj.phone.toString()
        };
        res.status(200).send(JSON.stringify(profile));
    } catch(err) {
        console.log(err);
        res.status(500).send("Error");
    }
});

router.get("/teams/" , async function(req , res) {
    let studentObj = await Student.findById(req.query.id.toString()).clone();
    await studentObj.populate('teams');
    return res.status(200).send(studentObj);
});


router.post("/classes" , async function(req , res) {
    let studentObj = await Student.findOne({email : req.body.email.toString()}).clone().populate("courses");
    return res.status(200).send(studentObj);
});

module.exports = router

