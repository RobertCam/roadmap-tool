import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';  // Import AuthContext for logout
import InitiativeList from './InitiativeList';
import ProjectList from './ProjectList';
import MilestoneList from './MilestoneList';

const Home = () => {
    const { logout } = useContext(AuthContext);  // Get logout function from AuthContext

    return (
        <div>
            <h2>Welcome to the Product Management Roadmap Tool</h2>
            <button onClick={logout}>Logout</button>

            <section>
                <h3>Your Strategic Initiatives</h3>
                <InitiativeList />
            </section>

            <section>
                <h3>Your Projects</h3>
                <ProjectList />
            </section>

            <section>
                <h3>Your Milestones</h3>
                <MilestoneList />
            </section>
        </div>
    );
};

export default Home;
