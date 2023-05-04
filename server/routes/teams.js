const express = require('express')
const router = express.Router()
const Team = require('../models/team')
const Class = require('../models/class')
const Student = require('../models/student')

router.get('/', async function(req, res){
    let team = await Team.findById(req.query.id.toString()).clone();
    await team.populate('class');
    await team.populate('manager')
    await team.populate('members');
    await team.populate('tasks');
    return res.status(200).send(team);
});

router.post('/', async function(req, res){

    let team = await Team.findOne({class:req.body.class.toString(), members:{$elemMatch:{$eq:req.body.manager}}}).clone()

    if (team)
        return res.status(409).send("Already a member of a team!")

    team = await Team.findOne({name : req.body.name.toString(), class : req.body.class.toString()}).clone();
    
    if (team)
        return res.status(409).send("Team name already in use. Please select a different name.");
    
    team = new Team({
        name : req.body.name.toString(),
        projectName : req.body.projectName.toString(),
        class : req.body.class.toString(),
        manager : req.body.manager.toString(),
        members : [req.body.manager.toString()]
    });

    await team.save();
    
    await Class.findByIdAndUpdate(
        req.body.class.toString(),
        {$push: {teams : team}}
    );

    await Student.findByIdAndUpdate(
        req.body.manager.toString(),
        {$push: {teams : team}}
    );
    
    return res.status(200).send("Team created successfully!");
});

module.exports = router

    