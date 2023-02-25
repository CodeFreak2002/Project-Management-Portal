import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './Login.tsx';
import Register from './Register.tsx';
import Landing from './Landing/Landing';
import StudentDashboard from './StudentDashboard/StudentDashboard';
import TeacherDashboard from './TeacherDashboard/TeacherDashboard';

 

function App() {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path='/studentDashboard' element={<StudentDashboard/>} />
        <Route path='/TeacherDashboard' element={<TeacherDashboard/>} />
      </Routes>
    </Router>
    
  );
}

export default App;