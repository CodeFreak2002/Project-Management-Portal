import { Link } from "react-router-dom";

const { Card, CardContent, Typography } = require("@mui/material");

function TeacherCard({ clName }) {
  let link = "/class/" + clName;
  return (
    <Link to={link}>
      <Card variant="elevation" style={{ height: '250%', backgroundColor: "#5ad1b5" }}>
        <CardContent>
          <Typography style={{ fontSize: '150%' }}>{clName}</Typography>
          {/* <Typography style={{fontSize: '125%'}}>{instructorName}</Typography> */}
        </CardContent>
      </Card>
    </Link>
  )
}

export default TeacherCard;