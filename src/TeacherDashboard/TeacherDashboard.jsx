import { Grid, Typography } from "@mui/material";
import TeacherCard from "./TeacherCard";
import Navbar from "../Landing/Navbar";


function TeacherDashboard() {
    return (
        <div style={{margin: '0 auto'}}>
            <Navbar/>
            <div className="greeting" style={{textAlign: 'center', marginTop: '3%'}}>
                <Typography variant="h3" style={{color: 'black'}}>Good evening, Ashwin!</Typography>
            </div>
            <div style={{margin: '0 auto'}}>
                <Grid container rowSpacing={15} columnSpacing={8} style={{padding: '5%', marginBottom: '5%'}}>
                    <Grid item xs={6} md={3}>
                        <TeacherCard clName={"abc"} instructorName={"def"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TeacherCard clName={"abc2"} instructorName={"def2"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TeacherCard clName={"abc3"} instructorName={"def3"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TeacherCard clName={"abc4"} instructorName={"def4"} />
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <TeacherCard clName={"abc"} instructorName={"def"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TeacherCard clName={"abc2"} instructorName={"def2"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TeacherCard clName={"abc3"} instructorName={"def3"} />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <TeacherCard clName={"abc4"} instructorName={"def4"} />
                    </Grid>
                </Grid>
            </div>
            <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke  ' }}>
                © 2023 Copyright Teamify
            </div>
        </div>
    )
}

export default TeacherDashboard;