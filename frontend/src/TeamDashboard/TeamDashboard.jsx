import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Snackbar, TextField, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { MDBInput } from 'mdb-react-ui-kit';
import Announcement from "./Announcement";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import RequestCard from "./RequestCard";
import StudentNavbar from "../StudentDashboard/StudentNavbar";
import TeacherNavbar from "../TeacherDashboard/TeacherNavbar";

export default function TeamDashboard() {
    const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);
    const [teamName, setTeamName] = useState("");
    const [projectName, setProjectName] = useState("");
    const [teamMembers, setTeamMembers] = useState("");
    const [taskCards, setTaskCards] = useState([]);
    const [manager, setManager] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [severity, setSeverity] = useState("");
    const [msg, setMsg] = useState("");
    const [upd, setUpd] = useState(0);
    const [inviteCards, setInviteCards] = useState([]);

    let params = queryString.parse(useLocation().search);

    const closeDialog = () => {
        setOpen(false);
        setTitle("");
        setDescription("");
        setDeadline("");
    }

    const acceptRequest = async (invite) => {
        console.log(invite);
        await axios.post("https://project-management-portal-server.vercel.app/team/accept", {
            team: params.id,
            student: invite._id,
            status: "accept"
        }).then((res) => {
            if (res.status === 200) {
                setOpen1(true);
                setSeverity("success");
                setMsg("Team member added successfully!");
            }
        }).catch((err) => {
            console.log(err);
            setOpen1(true);
            setSeverity("error");
            setMsg(err.response.data);
        })
    }

    const rejectRequest = async (invite) => {
        console.log(invite);
        await axios.post("https://project-management-portal-server.vercel.app/team/accept", {
            team: params.id,
            student: invite._id,
            status: "reject"
        }).then((res) => {
            if (res.status === 200) {
                setOpen1(true);
                setSeverity("success");
                setMsg("Request Denied!");
            }
        }).catch((err) => {
            console.log(err);
            setOpen1(true);
            setSeverity("error");
            setMsg(err.response.data);
        })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen1(false);
    };

    const fetchData = async () => {
        await axios.get(`https://project-management-portal-server.vercel.app/team?id=${params.id}`)
        .then((res) => {
            console.log(res.data);
            setTeamName(res.data.name);
            setProjectName(res.data.projectName);
            setManager(res.data.manager);

            let members = res.data.members;
            let tempTeamList = "";
            members.forEach(member => {
                tempTeamList += member.name;
                tempTeamList += ", ";
            });
            tempTeamList = tempTeamList.slice(0, -1);
            tempTeamList = tempTeamList.slice(0, -1);
            setTeamMembers(tempTeamList);

            let tasks = res.data.tasks;
            let tempTaskCards = [];
            tasks.forEach(task => {
                let date = null;
                if (task.deadline !== null) {
                    let val = Date.parse(task.deadline);
                    date = new Date(val);
                }
                tempTaskCards.push(<TaskCard id={task._id} taskTitle={task.title} taskStatus={task.completionStatus} taskDeadline={task.deadline !== null?date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(): "---"}/>)
            });
            setTaskCards(tempTaskCards);

            let invites = res.data.invites;
            let tempInvites = [];
            invites.forEach(invite => {
                tempInvites.push(<RequestCard id={invite._id} studentName={invite.name} acceptFn={() => {acceptRequest(invite)}} rejectFn={() => {rejectRequest(invite)}} />)
            });
            setInviteCards(tempInvites);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const createTask = async () => {
        setOpen(true);
        if (description.length === 0) {
            setOpen1(true);
            setSeverity("error");
            setMsg("Please enter description!");
            setUpd(upd + 1);
        }
        else {
            await axios.post("https://project-management-portal-server.vercel.app/task/create", {
                title: title,
                description: description,
                deadline: deadline,
                team: params.id,
                member: student.token._id
            }).then((res) => {
                if (res.status === 200) {
                    setOpen1(true);
                    setSeverity("success");
                    setMsg("Created task successfully!");
                }
                else {
                    setOpen1(true);
                    setSeverity("warning");
                    setMsg(res.data);
                }
            }).catch((err) => {
                setOpen1(true);
                setSeverity("error");
                setMsg(err.response.data);
            })
        }
        setOpen(false);
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     fetchData();
    // }, [upd]);

    return (
        <div>
            {Object.keys(student).length > 0?<StudentNavbar/>:<TeacherNavbar/>}
            <div style={{display: "flex"}}>
                <div style={{width: "80%", paddingLeft: "4%"}}>
                    <Typography variant="h5">Team Name: {teamName}</Typography>
                    <Typography variant="h5">Project Name: {projectName}</Typography>
                    <Typography variant="h5">Team Members: {teamMembers}</Typography>
                </div>
                <div style={{width: "20%", paddingRight: "3%"}}>
                    {Object.keys(student).length > 0 && student.token._id === manager._id && <Button fullWidth color="success" style={{margin: "2%"}} variant="contained" onClick={() => setOpen(true)}>Create Task</Button>}
                    {Object.keys(student).length > 0 && student.token._id === manager._id && <Button fullWidth style={{margin: "2%"}} variant="contained" onClick={() => setOpen2(true)}>View Join Requests</Button>}
                </div>
            </div>
            {taskCards}
            <Dialog open={open}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <TextField style={{margin: "1%"}} fullWidth value={title} onChange={(e) => setTitle(e.target.value)} label="Title"></TextField>
                    <TextField style={{margin: "1%"}} fullWidth value={description} onChange={(e) => setDescription(e.target.value)} label="Description" />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={closeDialog}>Cancel</Button>
                    <Button onClick={createTask}>Create Task</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth maxWidth={"lg"} open={open2}>
                <DialogTitle>Pending Requests</DialogTitle>
                <DialogContent>
                    {inviteCards}
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={() => setOpen2(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={open1} autoHideDuration={5000} onClose={handleClose}>
                <Alert open={open1} variant="filled" severity={severity} onClose={handleClose}>{msg}</Alert>
            </Snackbar>
        </div>
    )
}