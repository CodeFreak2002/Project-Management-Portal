const { Card, CardContent, Typography } = require("@mui/material");

function TeacherCard( {clName, instructorName} ) {
    return (
        <Card variant="elevation" style={{height: '175%', backgroundColor: "#19888f"}}>
            <CardContent>
                <Typography style={{fontSize: '150%'}}>{clName}</Typography>
                <Typography style={{fontSize: '125%'}}>{instructorName}</Typography>
            </CardContent>
        </Card>
    )
}

export default TeacherCard;