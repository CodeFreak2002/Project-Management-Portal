import { Grid, Typography } from "@mui/material";
import ClassCard from "./ClassCard";
import Navbar from "./StudentNavbar";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext";


function StudentDashboard() {
    const [upd, setUpd] = useState(false);
    const {student, setStudent, teacher, setTeacher} = useContext(AuthContext);
    let courses = student.token.courses;
    let classCards = [];
    courses.forEach(course => {
        classCards.push(
            <Grid item xs={6} md={3}>
                <ClassCard clName={course} instructorName={"def"} />
            </Grid>
        )
    });

    useEffect(() => {

    }, [upd]);

    return (
        <div style={{margin: '0 auto'}}>
            <Navbar stateChanger={setUpd}/>
            <div className="greeting" style={{textAlign: 'center', marginTop: '3%'}}>
                <Typography variant="h3" style={{color: 'black'}}>Good evening, {student.token.name}!</Typography>
            </div>
            <div className="projects" style={{margin: '0 auto'}}>
                <div className="projects-heading" style={{marginLeft: '5%', marginTop: '2%'}}>
                    <Typography variant="h4" style={{color: 'black'}}>My Projects</Typography>
                </div>
                <Grid container rowSpacing={17} columnSpacing={8} style={{padding: '2% 5%', marginBottom: '10%'}}>
                    {classCards}
                </Grid>
            </div>
            <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke', marginTop: '10%'}}>
                © 2023 Copyright Teamify
            </div>
        </div>
        
    )
}

export default StudentDashboard;