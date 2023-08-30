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
import { Link } from '@mui/material';
import './TaskDetail.css';

export default function TaskDetail() {
  return (
    <Link to={'../src/StudentDashboard'} style={{textDecoration:'none'}}>
    <MDBCard className='taskcard'>
      <MDBRow className='g-0'>
        <MDBCol md='1' style={{backgroundColor:'lightblue'}}>
            
        </MDBCol>
        <MDBCol md='8'>
          <MDBCardBody>
            <MDBCardTitle>Task 1</MDBCardTitle>
            <MDBCardText style={{color:'GrayText', fontSize:'110%'}}>
              This is a wider card with supporting text below as a natural lead-in to additional content. This
              content is a little bit longer.
            </MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>
    </MDBCard>
    </Link>
  );
}