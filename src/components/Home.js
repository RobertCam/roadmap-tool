import React from 'react';
import InitiativeList from './InitiativeList';
import ProjectList from './ProjectList';
import MilestoneList from './MilestoneList';

const Home = () => {
    return (
        <div className="container">
            <h2>Welcome to the Product Management Roadmap Tool</h2>

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
