import React from 'react';
import InitiativeList from './components/InitiativeList';
import ProjectList from './components/ProjectList';
import MilestoneList from './components/MilestoneList';
import InitiativeForm from './components/InitiativeForm';
import ProjectForm from './components/ProjectForm';
import MilestoneForm from './components/MilestoneForm';

function App() {
    return (
        <div className="App">
            <h1>Product Management Roadmap</h1>
            <InitiativeForm />
            <ProjectForm />
            <MilestoneForm />
            <InitiativeList />
            <ProjectList />
            <MilestoneList />
        </div>
    );
}

export default App;
