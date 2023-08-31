const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Class = require('../models/class')
const Task = require('../models/task')

router.get("/", async(req, res) => {
    let task = await Task.findById(req.query.id).clone();
    await task.populate('executedBy');
    await task.populate('team');
    return res.status(200).send(task);
});

router.post("/create/" , async(req , res) => {
    let team = await Team.findById(req.body.team.toString()).clone();

    if (req.body.member != team.manager)
        return res.status(403).send("Only team manager can create tasks!")

    let task = new Task({
        title : req.body.title.toString(),   
        description : req.body.description.toString(),
        deadline: req.body.deadline ? req.body.deadline.toString() : null,
        completionStatus : "Available",
        team : req.body.team.toString(),
    });
    await task.save();
    await Team.findByIdAndUpdate(
        req.body.team.toString(),
        {$push : {tasks : task}}
    );
    return res.status(200).send("Task Added");
});

router.post("/pick" , async(req , res) => {
    let task = await Task.findById(req.body.task.toString()).clone();
    
    if(!task)
        return res.status(500).send("No such task found!");
    
        if(task.completionStatus != "Available")
        return res.status(500).send("Task already picked by some team member!");
    
        let curTime = Date.now();

    task.executedBy = req.body.member.toString();
    task.completionStatus = "Ongoing";
    task.startTime = curTime;
    await task.save();
    return res.status(200).send("Task successfully picked!");
});

router.post("/submit" , async(req , res) => {

    let task = await Task.findById(req.body.task.toString()).clone();
    
    if(!task)
        return res.status(404).send("No such task found!");
        
    if(task.executedBy != req.body.member.toString())
        return res.status(409).send("Task assigned to different user!");
    
    if (task.completionStatus == "In Review")
        return res.status(409).send("Task already submitted for review!")

    if(task.completionStatus == "")
        return res.status(409).send("Task not yet picked up!");
 
    if(task.completionStatus == "Completed")
        return res.status(409).send("Task already completed!");   

    let curTime = Date.now();
    
    await Task.findByIdAndUpdate(

        req.body.task,
        
        { endTime : curTime, completionStatus : "In Review" },
        
        async function (err, task)
        {
            if (err)
                console.log(err)
            else
            {
                console.log(task.team)
                await Team.findByIdAndUpdate(
                    task.team,
                    { $push: {review: req.body.task} }
                ).clone()
            }
        } 
    ).clone();
    
    return res.status(200).send("Task sent for review!");
});

router.post("/accept", async(req, res) => {

    let task = await Task.findById(req.body.task).clone()

    if (!task)
        return res.status(404).send("Task not found!")
    
    if (req.body.status == "accept")
    {
        await Task.findByIdAndUpdate(
            req.body.task,
            { completionStatus : "Completed" }
        ).clone()
    }
    else
    {
        await Task.findByIdAndUpdate(
            req.body.task,
            { completionStatus : "Ongoing" }
        ).clone()
 
    }

    await Team.findByIdAndUpdate(
        task.team,
        { $pull: {review: req.body.task} }
    ).clone()

    return res.status(200).send("Success");
});

module.exports = router;
