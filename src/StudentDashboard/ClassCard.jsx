const { Card, CardContent, Typography } = require("@mui/material");

function ClassCard( {className, instructorName} ) {
    return (
        <Card variant="elevation" style={{width: '75%', height: '150%', margin: '3%', backgroundColor: '#19888f'}}>
            <CardContent>
                <Typography variant="h4">{className}</Typography>
                <Typography variant="h5">{instructorName}</Typography>
            </CardContent>
        </Card>
    )
}

export default ClassCard;