import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InitiativeList = () => {
    const [initiatives, setInitiatives] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/initiatives')
            .then(response => setInitiatives(response.data))
            .catch(error => console.error('There was an error fetching the initiatives!', error));
    }, []);

    return (
        <div>
            <h2>Strategic Initiatives</h2>
            <ul>
                {initiatives.map(initiative => (
                    <li key={initiative.id}>
                        <h3>{initiative.name}</h3>
                        <p>{initiative.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InitiativeList;
