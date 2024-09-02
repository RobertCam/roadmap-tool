import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MilestoneList = () => {
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/milestones`)
            .then(response => setMilestones(response.data))
            .catch(error => console.error('There was an error fetching the milestones!', error));
    }, []);

    return (
        <div>
            <h2>Milestones</h2>
            <ul>
                {milestones.map(milestone => (
                    <li key={milestone.id}>
                        <h3>{milestone.name}</h3>
                        <p>{milestone.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MilestoneList;
