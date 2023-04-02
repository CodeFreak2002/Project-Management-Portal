import { Link } from "react-router-dom";

const { Card, CardContent, Typography } = require("@mui/material");

function TeacherCard({ clName, clCode }) {
  let link = "/teacher/class/" + clCode;
  return (
    <Link to={link}>
      <Card variant="elevation" style={{ minHeight: '175%', backgroundColor: "#5ad1b5" }} raised>
        <CardContent>
          <Typography style={{ fontSize: '150%' }}>{clCode}</Typography>
          <Typography style={{fontSize: '125%'}}>{clName}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default TeacherCard;