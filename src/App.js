import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './AuthContext';
import InitiativeList from './components/InitiativeList';
import ProjectList from './components/ProjectList';
import MilestoneList from './components/MilestoneList';
import InitiativeForm from './components/InitiativeForm';
import ProjectForm from './components/ProjectForm';
import MilestoneForm from './components/MilestoneForm';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
    const { user, logout } = useContext(AuthContext);

    return (
        <AuthProvider>
            <div className="App">
                <h1>Product Management Roadmap</h1>
                {!user ? (
                    <>
                        <Login />
                        <SignUp />
                    </>
                ) : (
                    <>
                        <button onClick={logout}>Logout</button>
                        <InitiativeForm />
                        <ProjectForm />
                        <MilestoneForm />
                        <InitiativeList />
                        <ProjectList />
                        <MilestoneList />
                    </>
                )}
            </div>
        </AuthProvider>
    );
}

export default App;
