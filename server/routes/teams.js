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
    await team.populate('invites');
    await team.populate('review');
    return res.status(200).send(team);
});

router.post('/', async function(req, res){

    let team = await Team.findOne({class:req.body.class.toString(), members:{$elemMatch:{$eq:req.body.manager.toString()}}}).clone()

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

router.post('/join', async function (req, res) {

    var requested_team = await Team.findById(req.body.team).clone()

    if (!requested_team)
        return res.status(404).send("Team does not exist!")

    var existing_team = await Team.findOne({class: requested_team.class, members:{$elemMatch:{$eq:req.body.student}}}).clone()
    
    if (existing_team)
        return res.status(409).send("Already a member of a team!")
    
    if (requested_team.invites.includes(req.body.student))
        return res.status(409).send("There is already a pending request!")

    var team_class = await Class.findById(requested_team.class).clone()
    
    if (team_class.students.includes(req.body.student))
    {
        await Team.findByIdAndUpdate(
            req.body.team,
            {$push: {invites: req.body.student}}
        );

        return res.status(200).send("Request successfully sent!")
    }
    else
        return res.status(409).send("Not enrolled in this course!")
 
});

router.post('/accept', async function (req, res) {
    var team = await Team.findById(req.body.team).clone()

    if (!team.invites.includes(req.body.student))
        return res.status(404).send("Request not found!")
    
    if (req.body.status == "accept")
    {
        var exisiting_team = await Team.findOne({class: team.class, members: {$elemMatch:{$eq: req.body.student}}}).clone()

        if (exisiting_team)
            return res.status(409).send("Cannot accept request. Already member of a team!")

        await Team.findByIdAndUpdate(
            req.body.team,
            {$push: {members: req.body.student}},
            {$pull: {invites: req.body.student}}
        );

        await Student.findByIdAndUpdate(
           req.body.student,
           {$push: {teams: req.body.team}} 
        );
    }
    
    await Team.findByIdAndUpdate(
        req.body.team,
        {$pull: {invites: req.body.student}}
    );

    return res.status(200).send("Success")
});

module.exports = router

    