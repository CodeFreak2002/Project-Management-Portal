import React, { useContext, useState, useReducer, useEffect } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import Button from '@mui/material/Button';
import './TeacherNavbar.css';
import AuthContext from '../AuthContext';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';

function TeacherNavbar() {
  const [showNavColor, setShowNavColor] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [classCode, setClassCode] = useState("");
  const [classTitle, setClassTitle] = useState("");
  const { student, setStudent, teacher, setTeacher } = useContext(AuthContext);

  const logoutUser = () => {
    localStorage.removeItem('teacher');
    setTeacher({});
  }

  const closeDialog = () => {
    setOpen(false);
    setClassCode("");
    setClassTitle("");
  }

  const createClass =  async () => {
    await axios.post("http://localhost:5000/class/create", {
      email: teacher.token.email,
      title: classTitle,
      code: classCode
    }).then((res) => {
      if (res.status === 200) {
        console.log("Successfully added new class!");
        let newTeacher = teacher;
        if (classCode.length!=0) newTeacher.token.courses.push(classCode);
        setTeacher(newTeacher);
        localStorage.setItem('teacher', JSON.stringify(teacher));
      }
    })
    setOpen(false);
  }

  return (
    <>
      <MDBNavbar expand='lg' bgColor='light'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='#'><span className='navbar-title'>Teamify</span>{' '}</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 justify-content-end' style={{ width: "100%" }}>
              <MDBNavbarItem>
                <MDBNavbarLink>
                  <Button variant='outlined' onClick={() => setOpen(true)}>Create Class</Button>
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <Button variant='contained' onClick={logoutUser}>Logout</Button>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
      <br />
      <Dialog open={open}>
        <DialogTitle>Create Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the code and title of the new class:
          </DialogContentText>
          <TextField variant='outlined' required fullWidth style={{marginTop: '5%'}} value={classCode} onChange={(e) => setClassCode(e.target.value)} label="New Class Code" />
          <br/>
          <TextField variant='outlined' required fullWidth style={{marginTop: '5%'}} value={classTitle} onChange={(e) => setClassTitle(e.target.value)} label="New Class Title" />
        </DialogContent>
        <DialogActions>
          <Button variant='text' color='error' onClick={closeDialog}>Cancel</Button>
          <Button variant='text' onClick={createClass}>Create Class</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TeacherNavbar;