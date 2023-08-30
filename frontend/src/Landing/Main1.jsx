import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import './Main1.css';
import Stack from '@mui/material/Stack';  
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import { margin, textAlign } from '@mui/system';
import { TextField } from '@mui/material';
import { View, StyleSheet, Text } from 'react-native';
 

export default function App() {

    return (
       <div className='main'>
            <div className='content'>
                <Typography variant='h3' style={{paddingTop: '13%', paddingLeft: '8%', color: 'black'}}>Teamify.</Typography>
                <Typography variant='h5' style={{paddingLeft: '8.25%', color: 'black'}}>Collaborate. Create. Conquer.</Typography>
            </div>
            <div className='image'>
                <img style={{width: 500, height: 350 , marginLeft:'35%'}} src="/images/5.jpg" alt="Reference pic"/>
            </div>

            <div>
                <Stack spacing={2} direction="row">
                    <Link href="/login" style={{marginLeft:'8%', marginTop: '1%'}}>
                        <Button variant="contained">Get Started →</Button> 
                    </Link>
                </Stack>     
            </div>
            <div className='header'>
                <Typography variant='h4' style={{color: 'black'}}> Features</Typography>
            </div>

            <div className='Features'>

               <div className='feature-image'style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
               <img cla style={{width: 120, height: 120 }} src="/images/feature_image_1.png" alt="" /> 
               <Typography variant='h5' style={{paddingTop:'30%'}} >Teamwork</Typography>
            <View>
                <Text>
                     Now you can work on your projects together,
                    {'\n'}
                    track your progress and get things done.
                </Text>
            </View>
               
               </div>
              
               <div className='feature-image'> 
               <img cla style={{width: 120, height: 120 }} src="/images/feature_image_2.png" alt="" /> 
               <Typography variant='h5'style={{paddingTop:'30%'}} >Collabrate</Typography>
               <View>
                <Text>
                    Join/create a team and work together
                    {'\n'}  
                    Get things done faster with Teamify
                </Text>
            </View>
               </div>
                
               <div className='feature-image'> 
                
               <img style={{width: 120, height: 120 }} src="/images/feature_image_3.png" alt="" /> 
              
               <Typography variant='h5' style={{paddingTop:'30%'}} >Tasks</Typography>
               <View>
                <Text>
                    Create tasks and assign them to your team
                    {'\n'}
                    Let your team know what needs to be done
                </Text>
            </View>
               </div>
        </div>
        
        <div className='header'>
                <Typography variant='h4' style={{color: 'black'}}> Our Clients </Typography>
        </div>

            <div className='Companies'>

            <div className='feature-image'style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
               <img  style={{width: 100, height: 100 }} src="/images/company_img_1.png" alt="company_image" /> 
            </div>

            <div className='feature-image'style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
            <img  style={{width: 100, height: 100 }} src="/images/company_img_2.png" alt="company_image" /> 
            </div>

            <div className='feature-image'style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
            <img  style={{width: 100, height: 100 }} src="/images/company_img_3.png" alt="company_image" /> 
            </div>

            <div className='feature-image'style={{whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}> 
            <img  style={{width: 100, height: 100 }} src="/images/company_img_4.png" alt="company_image" /> 
            </div>

        </div>
    </div>
           
            
        
    );
}

 