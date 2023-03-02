import { Grid, Typography } from "@mui/material";
import TeacherCard from "./TeacherCard";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import Navbar from './TeacherNavbar';

function TeacherDashboard() {
    const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);
    let courses = teacher.token.courses;
    let teacherCards = [];
    courses.forEach(course => {
        teacherCards.push(
            <Grid item xs={6} md={3}>
                <TeacherCard clName={course} />
            </Grid>
    )});
    
    return (
        
        <div style={{margin: '0 auto'}}>
            <Navbar/>
            <div className="greeting" style={{textAlign: 'center', marginTop: '3%'}}>
                <Typography variant="h3" style={{color: 'black'}}>Good evening, {teacher.token.name}!</Typography>
            </div>
            <div style={{margin: '0 auto'}}>
                <Grid container rowSpacing={15} columnSpacing={8} style={{padding: '5%', marginBottom: '5%'}}>
                    {teacherCards}
                </Grid>
            </div>
            <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke  ' }}>
                © 2023 Copyright Teamify
            </div>
        </div>
    )
}

export default TeacherDashboard;