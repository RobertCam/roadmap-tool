import React from 'react';

const MilestoneCard = ({ milestone, view }) => {
    return (
        <div className="milestone-card">
            <h5>{milestone.name}</h5>
            <p>{milestone.description}</p>
            <Link to={`/edit-milestone/${milestone.id}`} className="btn-small">Edit</Link>
        </div>
    );
};

export default MilestoneCard;
