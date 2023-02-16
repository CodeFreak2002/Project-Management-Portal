const express = require('express');
const router = express.Router();
const Student = require('../models/student');

router.post('/register', async function(req,res){
    var student = await Student.findOne({email : req.body.email}).clone();
    if (student)
        return res.status(500).send("Email already registered");
    if (req.body.phone) {
        var student = await Student.findOne({phone : req.body.phone}).clone();
        if (student)
            return res.status(500).send("Phone already registered");
    }

    var newStudent = new Student({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        phone : req.body.phone,
    });

    await newStudent.save();
    return res.status(200).send("Registration successful");
});

router.post('/login' , async function(req , res) {
    let student = await Student.findOne({email : req.body.email}).clone();
    if(student) {
        if(student.password === req.body.password)
            return res.status(200).send(student);
        return res.status(500).send("Invalid Password");
    } 
    return res.status(500).send("Invalid Credentials");
});

module.exports = router

