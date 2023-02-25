import { Grid, Typography } from "@mui/material";
import ClassCard from "./ClassCard";
import Navbar from "../Landing/Navbar";


function StudentDashboard() {
    return (
        <div style={{margin: '0 auto'}}>
            <Navbar/>
            <div className="greeting" style={{textAlign: 'center', marginTop: '3%'}}>
                <Typography variant="h3" style={{color: 'black'}}>Good evening, Ashwin!</Typography>
            </div>
            <div className="projects" style={{margin: '0 auto'}}>
                <div className="projects-heading"style={{marginLeft: '5%', marginTop: '2%'}}>
                    <Typography variant="h4" style={{color: 'black'}}>My Projects</Typography>
                </div>
                <Grid container rowSpacing={15} columnSpacing={8} style={{padding: '2% 5%', marginBottom: '10%'}}>
                    <Grid item xs={6} md={3}>
                        <ClassCard clName={"abc"} instructorName={"def"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ClassCard clName={"abc2"} instructorName={"def2"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ClassCard clName={"abc3"} instructorName={"def3"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ClassCard clName={"abc4"} instructorName={"def4"} />
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <ClassCard clName={"abc"} instructorName={"def"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ClassCard clName={"abc2"} instructorName={"def2"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ClassCard clName={"abc3"} instructorName={"def3"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <ClassCard clName={"abc4"} instructorName={"def4"} />
                    </Grid>
                </Grid>
            </div>
            <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke', marginTop: '10%'}}>
                © 2023 Copyright Teamify
            </div>
        </div>
        
    )
}

export default StudentDashboard;