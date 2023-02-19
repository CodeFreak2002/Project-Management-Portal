import Navbar from './Navbar';
import Main1 from './Main1';
import Footer from './Footer';
import Typography from '@mui/material/Typography';

import './Landing.css';

function Landing() {
    return (
        <div class="main">
            <Navbar/>
            <div className='branding'>
                <Main1/>
                <Footer/>
            </div>
            
                 
             

        </div>
    )
}

export default Landing;