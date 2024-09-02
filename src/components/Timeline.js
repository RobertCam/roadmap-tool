import React, { useState, useEffect } from 'react';
import InitiativeCard from './InitiativeCard';
import axios from 'axios';
import './Timeline.css';

const Timeline = () => {
    const [initiatives, setInitiatives] = useState([]);
    const [view, setView] = useState('month'); // Default view is by month

    useEffect(() => {
        fetchInitiatives();
    }, []);

    const fetchInitiatives = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`);
            setInitiatives(response.data);
        } catch (error) {
            console.error('Error fetching initiatives:', error);
        }
    };

    return (
        <div className="timeline-container">
            <div className="timeline-controls">
                <button onClick={() => setView('week')}>Week</button>
                <button onClick={() => setView('month')}>Month</button>
                <button onClick={() => setView('quarter')}>Quarter</button>
            </div>
            <div className="timeline">
                {initiatives.map(initiative => (
                    <InitiativeCard
                        key={initiative.id}
                        initiative={initiative}
                        view={view}
                    />
                ))}
            </div>
        </div>
    );
};

export default Timeline;
