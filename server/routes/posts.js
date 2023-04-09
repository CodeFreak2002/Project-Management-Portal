const express = require("express");
const Student = require("../models/student.js");
const router = express.Router();
const Class = require("../models/class.js");
const Teacher = require("../models/teacher.js");
const Post = require("../models/post.js");

router.post("/" , async(req , res) => {
    let newpost = new Post({
        content : req.body.content,
        author : req.body.author
    });
    
    await newpost.save();
    await Class.findByIdAndUpdate(
        req.body.class,
        {$push: {posts : newpost}}
    );
    return res.status(200).send("Post created successfully");
});

module.exports = router;