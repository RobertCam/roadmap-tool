import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Timeline from './components/Timeline';
import InitiativeList from './components/InitiativeList';
import ProjectList from './components/ProjectList';
import MilestoneList from './components/MilestoneList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Navbar from './components/Navbar'; 
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';


const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route 
                    path="/timeline" 
                    element={user ? <Timeline /> : <Navigate to="/login" />}  
                />              
                <Route
                    path="/initiatives"
                    element={user ? <InitiativeList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/projects"
                    element={user ? <ProjectList /> : <Navigate to="/login" />}
                />
                <Route
                    path="/milestones"
                    element={user ? <MilestoneList /> : <Navigate to="/login" />}
                />
            </Routes>
        </Router>
    );
};

export default App;