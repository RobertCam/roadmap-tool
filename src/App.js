import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Timeline from './components/Timeline';
import InitiativeList from './components/InitiativeList';
import ProjectList from './components/ProjectList';
import MilestoneList from './components/MilestoneList';
import ProjectForm from './components/ProjectForm';
import InitiativeForm from './components/InitiativeForm';
import MilestoneForm from './components/MilestoneForm';
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
                <Route path="/create/project" element={user ? <ProjectForm isEdit={false} />  : <Navigate to="/login" />} />
                <Route path="/create/initiative" element={user ? <InitiativeForm isEdit={false} /> : <Navigate to="/login" />} />
                <Route path="/create/milestone" element={user ? <MilestoneForm isEdit={false} /> : <Navigate to="/login" />} />
                <Route path="/edit/project/:id" element={<ProjectForm isEdit={true} />} />
                <Route path="/edit/initiative/:id" element={<InitiativeForm isEdit={true} />} />
                <Route path="/edit/milestone/:id" element={<MilestoneForm isEdit={true} />} />
            </Routes>
        </Router>
    );
};

export default App;