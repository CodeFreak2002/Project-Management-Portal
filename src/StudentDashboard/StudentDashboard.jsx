import { Grid } from "@mui/material";
import ClassCard from "./ClassCard";

function StudentDashboard() {
    return (
        <div style={{alignItems: 'center', justifyContent: 'center'}}>
            <div style={{alignItems: 'center', justifyContent: 'center'}}>
            <Grid container rowSpacing={15}>
                <Grid item xs={6} md={3}>
                    <ClassCard className={"abc"} instructorName={"def"} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <ClassCard className={"abc2"} instructorName={"def2"} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <ClassCard className={"abc3"} instructorName={"def3"} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <ClassCard className={"abc4"} instructorName={"def4"} />
                </Grid>

                <Grid item xs={6} md={3}>
                    <ClassCard className={"abc"} instructorName={"def"} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <ClassCard className={"abc2"} instructorName={"def2"} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <ClassCard className={"abc3"} instructorName={"def3"} />
                </Grid>
                <Grid item xs={6} md={3}>
                    <ClassCard className={"abc4"} instructorName={"def4"} />
                </Grid>
            </Grid>
            </div>
        </div>
    )
}

export default StudentDashboard;