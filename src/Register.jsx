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
import background from './StudentDashboard/background.png'

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Student");

  const handleSubmit = async () => {
    console.log(name, email, password, phone);
    if (role === "Student") {
      await axios.post('http://project-management-portal-server.vercel.app/student/register', {
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
      await axios.post('http://project-management-portal-server.vercel.app/teacher/register', {
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
    <MDBContainer fluid className=' register d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: `url(${background})`}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password'/>
          <MDBInput wrapperClass='mb-4' label='Phone' size='lg' id='form4' type='password'/>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default Register;