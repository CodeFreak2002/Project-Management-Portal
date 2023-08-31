import React, { useState } from 'react';
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
import './Navbar.css';
 


export default function App() {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);

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
            
              <MDBNavbarItem color='#d3d3d3' className='active'>
                <MDBNavbarLink style={{padding: 13}} aria-current='page' href='#'>
                <span style={{color: 'black'}}> <span className="navbar-link">Home</span></span>{' '}
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='#' style={{padding: 13}}><span className='navbar-link'>About</span></MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                    <Button variant='contained'>Login/Sign Up</Button>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <br />
 
      

      
    </>
  );
}


  
  
   