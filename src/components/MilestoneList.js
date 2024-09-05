import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const MilestoneList = () => {
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/milestones`)
            .then(response => setMilestones(response.data))
            .catch(error => console.error('There was an error fetching the milestones!', error));
    }, []);

    return (
        <div className="container">
            <h2>Milestones</h2>
            <div className="row">
                {milestones.map(milestone => (
                    <div className="col s12 m6 l4" key={milestone.id}>
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">{milestone.name}</span>
                                <p>{milestone.description}</p>
                            </div>
                            <div className="card-action">
                                <Link to={`/edit-milestone/${milestone.id}`} className="btn-small">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MilestoneList;
