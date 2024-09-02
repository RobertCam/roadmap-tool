import React from 'react';

const MilestoneCard = ({ milestone, view }) => {
    return (
        <div className="milestone-card">
            <h5>{milestone.name}</h5>
            <p>{milestone.description}</p>
        </div>
    );
};

export default MilestoneCard;
