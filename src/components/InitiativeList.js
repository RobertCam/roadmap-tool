import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const InitiativeList = () => {
    const [initiatives, setInitiatives] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`)
            .then(response => setInitiatives(response.data))
            .catch(error => console.error('There was an error fetching the initiatives!', error));
    }, []);

    return (
        <div className="container">
            <h2>Strategic Initiatives</h2>
            <div className="row">
                {initiatives.map(initiative => (
                    <div className="col s12 m6 l4" key={initiative.id}>
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">{initiative.name}</span>
                                <p>{initiative.description}</p>
                            </div>
                            <div className="card-action">
                                <Link to={`/edit-initiative/${initiative.id}`} className="btn-small">Edit</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InitiativeList;
