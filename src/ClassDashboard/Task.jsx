import { Grid, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import Navbar from "../StudentDashboard/StudentNavbar";
import { useContext } from "react";
import AuthContext from "../AuthContext";
import { MDBInput } from 'mdb-react-ui-kit';
import Announcement from "./Announcement";

function Task() {

    return (
        <div>
            <Navbar/>
            <Announcement/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            <TaskCard/>
            
            <div className='text-center p-3' style={{ backgroundColor: 'whitesmoke', marginTop: '10%'}}>
                © 2023 Copyright Teamify
            </div>
        </div>
    )
}

export default Task;