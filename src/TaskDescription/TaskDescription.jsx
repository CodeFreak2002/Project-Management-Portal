import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit';
import Navbar from '../StudentDashboard/StudentNavbar';
import Typography from '@mui/material/Typography';
import { alignProperty } from '@mui/material/styles/cssUtils';
import './TaskDescription.css';
import TaskDeail from "./TaskDetail";

export default function TaskDescription() {
  return (
    <div>
    <Navbar/>
    <div className='main'>
        <div className='container-fluid d-flex'>
          <MDBCard style={{height:'28.5vw',width:'85%', marginTop:'5%',marginLeft:'5%'}}>
              <MDBCardBody>
                <MDBCardTitle style={{paddingBottom:'1%', fontSize:'180%', marginTop:'3%'}}>Cursive Writing Assignment 1</MDBCardTitle>
                <MDBCardText style={{fontSize:'130%', paddingBottom:'4%'}}>
                  Mary John
                </MDBCardText>
                <MDBCardText style={{fontSize:'120%'}}>
                  The students have to finish the assignment as assigned in the class.The work has to be completed in two subparts and both the sections are compulsory.

                </MDBCardText>
                <MDBCardText style={{fontSize:'130%', marginTop:'15%',color:'green'}}>
                  Status:  Active
                </MDBCardText>
              </MDBCardBody>
            </MDBCard>
          </div>

        <div className='container-fluid d-flex'>
          <MDBCard style={{height:'24vw',width:'50%', backgroundColor:'lightgrey',marginTop:'5%', marginLeft:'40%'}}>
              <MDBCardBody>
                <MDBCardTitle style={{paddingBottom:'5%', fontSize:'140%', marginTop:'3%'}}>Task Name</MDBCardTitle>
                <MDBCardText style={{fontSize:'120%'}}>
                   Assigned Date : 10/03/23
                </MDBCardText>
                <MDBCardText style={{fontSize:'120%'}}>
                  Deadline : 25/03/23
                </MDBCardText>
                <MDBCardText style={{fontSize:'120%'}}>
                  Submission : Pending
                </MDBCardText>
                <MDBBtn style={{marginTop:'26%', width:'100%', fontFamily:'sans-serif',fontSize:'80%' }}>Submit</MDBBtn>
              </MDBCardBody>
            </MDBCard>
        </div>
      </div>
      <Typography style={{fontSize:'150%', marginTop:'7%', marginLeft:'5%'}} >Oops!.. There are pending tasks :( </Typography>
      <TaskDeail/>
      <TaskDeail/>
      <TaskDeail/>
      <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke', marginTop: '10%'}}>
                © 2023 Copyright Teamify
      </div>
    </div>
  );
}