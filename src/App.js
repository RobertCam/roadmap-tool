import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import InitiativeList from './components/InitiativeList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route
                    path="/"
                    element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                    path="/initiatives"
                    element={user ? <InitiativeList /> : <Navigate to="/login" />}
                />
                {/* Other routes here */}
            </Routes>
        </Router>
    );
};

export default App;
