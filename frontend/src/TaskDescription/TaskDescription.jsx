import React, { useContext, useEffect, useState } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import StudentNavbar from '../StudentDashboard/StudentNavbar';
import Typography from '@mui/material/Typography';
import { alignProperty } from '@mui/material/styles/cssUtils';
import './TaskDescription.css';
import TaskDeail from "./TaskDetail";
import { Alert, Button, Snackbar } from '@mui/material';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../AuthContext';
import TeacherNavbar from '../TeacherDashboard/TeacherNavbar';

export default function TaskDescription() {
  const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("---");
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [msg, setMsg] = useState("");
  const [manager, setManager] = useState("");
  const [executedBy, setExecutedBy] = useState("---");
  
  let params = queryString.parse(useLocation().search);

  let map = new Map();
  map.set("Completed", "#81c784");
  map.set("In Review", "#1976D2");
  map.set("Available", "#000000");
  map.set("Ongoing", "#ffb74d");
  map.set("Missed", "#e57373");

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setSeverity("");
    setMsg("");
  };

  const fetchData = async () => {
    await axios.get(`https://project-management-portal-server.vercel.app/task?id=${params.id}`)
    .then((res) => {
      console.log(res.data);
      setTaskTitle(res.data.title);
      setTaskDescription(res.data.description);
      setTaskStatus(res.data.completionStatus);
      setManager(res.data.team.manager);
      if (res.data.executedBy !== null) setExecutedBy(res.data.executedBy.name);
      if (res.data.deadline !== null) {
        let val = Date.parse(res.data.deadline);
        let date = new Date(val);
        setTaskDeadline(date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear());
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  const pickTask = async () => {
    await axios.post("https://project-management-portal-server.vercel.app/task/pick", {
      task: params.id,
      member: student.token._id
    }).then((res) => {
      if (res.status === 200) {
        setOpen(true);
        setSeverity("success");
        setMsg("Task successfully assigned!");
      }
      else {
        setOpen(true);
        setSeverity("warning");
        setMsg(res.data);
      }
    }).catch((err) => {
      console.log(err);
      setOpen(true);
      setSeverity("error");
      setMsg(err.response.data);
    })
  }

  const submitForReview = async () => {
    await axios.post("https://project-management-portal-server.vercel.app/task/submit", {
      task: params.id,
      member: student.token._id 
    }).then((res) => {
      if (res.status === 200) {
        setOpen(true);
        setSeverity("success");
        setMsg("Successfully submitted for review!");
      }
      else {
        setOpen(true);
        setSeverity("warning");
        setMsg(res.data);
      }
    }).catch((err) => {
      setOpen(true);
      setSeverity('error');
      setMsg(err.response.data);
    })
  }

  const approveTask = async () => {
    await axios.post("https://project-management-portal-server.vercel.app/task/accept", {
      task: params.id,
      status: "accept"
    }).then((res) => {
      if (res.status ===  200) {
        setOpen(true);
        setSeverity("success");
        setMsg("Approved!");
      }
      else {
        setOpen(true);
        setSeverity("warning");
        setMsg(res.data);
      }
    }).catch((err) => {
      setOpen(true);
      setSeverity("error");
      setMsg(err.response.data);
    })
  }

  const declineTask = async () => {
    await axios.post("https://project-management-portal-server.vercel.app/task/accept", {
      task: params.id,
      status: "reject"
    }).then((res) => {
      if (res.status ===  200) {
        setOpen(true);
        setSeverity("success");
        setMsg("Declined!");
      }
      else {
        setOpen(true);
        setSeverity("warning");
        setMsg(res.data);
      }
    }).catch((err) => {
      setOpen(true);
      setSeverity("error");
      setMsg(err.response.data);
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
    {Object.keys(student).length > 0?<StudentNavbar/>:<TeacherNavbar/>}
    <div className='main-main'>
        <div className='container-fluid d-flex'>
          <MDBCard style={{height:'28.5vw',width:'85%', marginTop:'5%',marginLeft:'5%'}}>
              <MDBCardBody>
                <MDBCardTitle style={{paddingBottom:'1%', fontSize:'180%', marginTop:'3%'}}>{taskTitle}</MDBCardTitle>
                <MDBCardText style={{fontSize:'120%'}}>
                  {taskDescription}
                </MDBCardText>
                <MDBCardText style={{fontSize:'130%'}}>
                  Status:  <span style={{color: map.get(taskStatus)}}>{taskStatus}</span>
                </MDBCardText>
                {executedBy !== "---" && <MDBCardText style={{fontSize:'130%'}}>
                  Executed By:  <span style={{color: map.get(taskStatus)}}>{executedBy}</span>
                </MDBCardText>}
              </MDBCardBody>
            </MDBCard>
          </div>

        <div className='container-fluid d-flex'>
          <MDBCard style={{width:'50%', backgroundColor:'lightgrey', height: "50%", marginTop: "5%", marginLeft:'40%'}}>
              <MDBCardBody>
                <MDBCardText style={{fontSize:'120%'}}>
                  Deadline: {taskDeadline}
                </MDBCardText>
                <MDBCardText style={{fontSize:'120%'}}>
                  Submission Status : {taskStatus === "Completed"?<>Completed</>:<>Pending</>}
                </MDBCardText>
                {Object.keys(student).length > 0 &&
                (taskStatus === "Available"?
                <Button variant='contained' color='success' onClick={pickTask} fullWidth>Pick up task</Button>
                :
                (taskStatus === "In Review"? 
                (student.token._id === manager && <div style={{display: "flex"}}>
                  <div style={{width: "50%", margin: "2%"}}>
                    <Button fullWidth variant='contained' color='success' onClick={approveTask}>Approve</Button>
                  </div>
                  <div style={{width: "50%", margin: "2%"}}>
                    <Button fullWidth variant='contained' color='error' onClick={declineTask}>Decline</Button>
                  </div>
                </div>)
                :
                (taskStatus === "Ongoing" && <Button variant='contained' onClick={submitForReview} fullWidth>Submit for review</Button>)))}
              </MDBCardBody>
            </MDBCard>
        </div>
      </div>
      <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke', marginTop: '10%'}}>
                © 2023 Copyright Teamify
      </div>
      <Snackbar open={open} onClose={handleClose} autoHideDuration={5000}>
        <Alert severity={severity} open={open} onClose={handleClose} variant='filled'>{msg}</Alert>
      </Snackbar>
    </div>
  );
}