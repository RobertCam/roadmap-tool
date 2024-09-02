import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InitiativeList = () => {
    const [initiatives, setInitiatives] = useState([]);

    useEffect(() => {
        const fetchInitiatives = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`);
                setInitiatives(response.data);
            } catch (error) {
                console.error('There was an error fetching the initiatives!', error);
                console.log(axios.defaults.headers.common); // Log headers to ensure the Authorization header is set
            }
        };

        fetchInitiatives();
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
