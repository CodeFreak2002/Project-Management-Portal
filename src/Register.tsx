import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Radio } from '@mui/material';
import { RadioGroup } from '@mui/material';
// import FormControl from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
// import { useState } from 'react';
import axios from 'axios';


function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    if(data.get('Role') === 'Student'){
      axios.post('http://localhost:5000/student/register', {
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        phone_number: data.get('phone_number'),
        role: data.get('Role')
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    else{
      axios.post('http://localhost:5000/teacher/register', {
        email: data.get('email'),
        password: data.get('password'),
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        phone_number: data.get('phone_number'),
        role: data.get('Role')
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    }
  };

  //radio buttons
  // const [selectedVal, setSelectedVal] = React.useState('a');
  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedVal = (event.target.value);
  // }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                   
                  fullWidth
                  name="phone_number"
                  label="Phone Number"
                  type="tel"
                  id="phone_number"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                  <FormLabel id = "demo-radio-buttons-group-label"> Role</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="Student"
                    name="radio-buttons-group"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {handleSubmit(e.target.value)}}
                  >
                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                    <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                  </RadioGroup>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2" align="center">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
