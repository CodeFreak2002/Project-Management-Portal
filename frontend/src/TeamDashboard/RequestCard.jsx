import { Button, Card, CardContent, Typography } from "@mui/material";

export default function RequestCard({id, studentName, acceptFn, rejectFn}) {
    return (
        <Card style={{backgroundColor: "#eee"}}>
            <CardContent>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div style={{width: "85%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                        <Typography variant="body1">{studentName}</Typography>
                    </div>
                    <div style={{width: "15%", display: "flex"}}>
                        <Button style={{marginLeft: "3%"}} variant="contained" color="success" onClick={acceptFn}>Accept</Button>
                        <Button style={{marginLeft: "3%"}} variant="contained" color="error" onClick={rejectFn}>Reject</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}