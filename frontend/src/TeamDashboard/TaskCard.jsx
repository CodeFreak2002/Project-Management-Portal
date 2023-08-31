import React from 'react';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import './TaskCard.css';

export default function TaskCard( {id, taskTitle, taskStatus, taskDeadline} ) {
  let map = new Map();
  map.set("Completed", "#4caf50");
  map.set("Missed", "#ef5350");
  map.set("Available", "#333333");
  map.set("In Review", "#03a9f4")
  map.set("Ongoing", "#ffb74d")

  return (
    <Link to={`/task?id=${id}`}>
      <MDBCard className='taskcard'>
        <MDBRow className='g-0'>
          <MDBCol sm='1' style={{backgroundColor: map.get(taskStatus)}}>
              
          </MDBCol>
          <MDBCol md='11'>
            <MDBCardBody>
              <MDBCardTitle>{taskTitle}</MDBCardTitle>
              <MDBCardText style={{color:'GrayText'}}>
                Deadline: {taskDeadline}
              </MDBCardText>
              <MDBCardText style={{color:'GrayText'}}>
                Status: {taskStatus}
              </MDBCardText>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </Link>
  );
}