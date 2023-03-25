import { Grid, Typography } from "@mui/material";
import TeacherCard from "./TeacherCard";
import { useContext, useEffect, useReducer, useState } from "react";
import AuthContext from "../AuthContext";
import Navbar from './TeacherNavbar';

function TeacherDashboard() {
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [upd, setUpd] = useState(false);
    const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);
    let courses = teacher.token.courses;
    let teacherCards = [];
    courses.forEach(course => {
        teacherCards.push(
            <Grid item xs={6} md={3}>
                <TeacherCard clName={course} />
            </Grid>
    )});

    useEffect(() => {
        console.log(upd);
    }, [upd]);

    return (
        
        <div style={{margin: '0 auto'}}>
            <Navbar stateChanger={setUpd}/>
            <div className="greeting" style={{textAlign: 'center', marginTop: '3%'}}>
                <Typography variant="h3" style={{color: 'black'}}>Good evening, {teacher.token.name}!</Typography>
            </div>
            <div style={{margin: '0 auto'}}>
                <div className="projects-heading" style={{marginLeft: '5%', marginTop: '2%'}}>
                    <Typography variant="h4" style={{color: 'black'}}>My Projects</Typography>
                </div>
                <Grid container rowSpacing={17} columnSpacing={8} style={{padding: '2% 5%', marginBottom: '15%'}}>
                    {teacherCards}
                </Grid>
                <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke', bottom: 0, marginTop: '5%' }}>
                  © 2023 Copyright Teamify
                </div>
            </div>
            
        </div>
    )
}

export default TeacherDashboard;