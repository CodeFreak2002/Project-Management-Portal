import { Link } from "react-router-dom";

const { Card, CardContent, Typography } = require("@mui/material");

function ClassCard( {clName} ) {
    let link = "/teams/" + clName;
    return (
        <Link to={link}>
            <Card variant="elevation" style={{height: '250%', backgroundColor: "#5ad1b5"}} raised>
                <CardContent>
                    <Typography style={{fontSize: '150%', color: 'black'}}>{clName}</Typography>
                    {/* <Typography style={{fontSize: '125%'}}>{instructorName}</Typography> */}
                </CardContent>
            </Card>
        </Link>
    )
}

export default ClassCard;