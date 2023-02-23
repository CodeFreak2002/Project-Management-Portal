const express = require("express");
const Student = require("../models/student.js");
const router = express.Router();
const Class = require("./../models/class.js");

async function CheckClassCode(code) {
    const classes = Class.find({code : code});
    return classes;
}

// TODO - async function for class enrollment

router.post("/create/" , async(req , res) => {
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

router.post("/enrol/", async(req, res) => {
    
    try {     
        var course = await Class.findOne({code : req.body.code}).clone();
        var student = await Student.findOne({email : req.body.email}).clone();
        
        const enrolled = await student.courses.includes(course.code); 
        
        if (enrolled)
            return res.status(202).send("Already enrolled.");

        course.students.push(student.email);
        student.courses.push(course.code);

        await course.save();
        await student.save();
        return res.status(200).send("Successful");
    
    } catch (err) {
        console.log(err)
        return res.status(500).send("Error occurred");
    }        

});

module.exports = router;
