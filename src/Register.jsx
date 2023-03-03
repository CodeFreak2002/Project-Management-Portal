import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';
import './Register.css';
import axios from 'axios';
import { MenuItem, Select, Button } from '@mui/material';

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Student");

  const handleSubmit = async () => {
    console.log(name, email, password, phone);
    if (role === "Student") {
      await axios.post('http://localhost:5000/student/register', {
        name: name,
        email: email,
        password: password,
        phone: phone
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
    else if (role === "Teacher") {
      await axios.post('http://localhost:5000/teacher/register', {
        name: name,
        email: email,
        password: password,
        phone: phone
      }).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <MDBContainer fluid style={{maxWidth: '80%'}}>

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4 ">
                <MDBIcon fas icon="user me-3" size='lg'/>
                <MDBInput value={name} onChange={(e) => setName(e.target.value)} label='Your Name' type='text' className='w-100'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                <MDBInput value={email} onChange={(e) => setEmail(e.target.value)} label='Your Email' type='email'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg'/>
                <MDBInput value={password} onChange={(e) => setPassword(e.target.value)} label='Password' type='password'/>
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="phone me-3" size='lg'/>
                <MDBInput value={phone} onChange={(e) => setPhone(e.target.value)} label='Phone' type='tel'/>
              </div>

              <div className='mb-4'>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <MenuItem value="Student">Student</MenuItem>
                  <MenuItem value="Teacher">Teacher</MenuItem>
                </Select>
              </div>

              <Button variant='contained' onClick={handleSubmit}>Register</Button>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Register;