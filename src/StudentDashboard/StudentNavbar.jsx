import React, { useContext, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { fontWeight } from '@mui/system';
import './StudentNavbar.css';
import AuthContext from '../AuthContext';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
 


export default function App() {
  const [showNavColor, setShowNavColor] = useState(false);
  const [open, setOpen] = useState(false);
  const [classCode, setClassCode] = useState("");
  const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);

  const logoutUser = () => {
    localStorage.removeItem('student');
    setStudent({});
  }

  const enrol = async () => {
    await axios.post("http://localhost:5000/class/enrol", {
      code: classCode,
      email: student.token.email
    }).then((res) => {
      if (res.status === 200) {
        console.log("Successfully enrolled!");
        let newStudent = student;
        if (classCode.length > 0)newStudent.token.courses.push(classCode);
        setStudent(newStudent);
        localStorage.setItem('student', JSON.stringify(student));
      }
      else if (res.status === 202) {
        console.log("Already enrolled!");
        // display already enrolled snackbar
      }
      setOpen(false);
    })
  }

  const joinClass = async () => {
    await axios.post("http://localhost:5000/class/search", {
      code: classCode
    }).then((res) => {
      if (res.status === 200) {
        enrol();
      }
      else if (res.status === 500) {
        console.log("Class not found!");
        // display class not found snackbar
      }
    })
  }

  return (
    <>
      <MDBNavbar expand='lg'  bgColor='light'>
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
          <MDBCollapse  show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 justify-content-end' style={{ width: "100%" }}>
                
                <MDBNavbarItem>
                    <MDBNavbarLink>
                        <Button variant='outlined' onClick={() => setOpen(true)}>Join Class</Button>
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
        <DialogTitle>Join Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the class code:
          </DialogContentText>
          <TextField variant='outlined' style={{marginTop: '5%'}} value={classCode} onChange={(e) => setClassCode(e.target.value)} placeholder="Class Code"></TextField>
        </DialogContent>
        <DialogActions>
          <Button variant='text' color='error' onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant='text' onClick={joinClass}>Join Class</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


  
  
   