import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Login.tsx';
import Register from './Register.tsx';
import Landing from './Landing/Landing';
import StudentDashboard from './StudentDashboard/StudentDashboard';
 

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/studentDashboard' element={<StudentDashboard/>} />
      </Routes>
    </Router>
    
  );
}

export default App;