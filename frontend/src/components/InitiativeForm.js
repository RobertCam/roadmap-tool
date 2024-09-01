import React, { useState } from 'react';
import axios from 'axios';

const InitiativeForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [problem, setProblem] = useState('');
    const [desiredOutcome, setDesiredOutcome] = useState('');
    const [keyMetrics, setKeyMetrics] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [detailedBriefLink, setDetailedBriefLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const initiative = {
            name,
            description,
            problem,
            desiredOutcome,
            keyMetrics,
            startDate,
            endDate,
            detailedBriefLink
        };

        axios.post('http://localhost:5000/api/initiatives', initiative)
            .then(response => {
                console.log(response.data);
                // Reset form after submission
                setName('');
                setDescription('');
                setProblem('');
                setDesiredOutcome('');
                setKeyMetrics('');
                setStartDate('');
                setEndDate('');
                setDetailedBriefLink('');
            })
            .catch(error => console.error('There was an error creating the initiative!', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Strategic Initiative</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required></textarea>
            <textarea value={problem} onChange={e => setProblem(e.target.value)} placeholder="Problem" required></textarea>
            <textarea value={desiredOutcome} onChange={e => setDesiredOutcome(e.target.value)} placeholder="Desired Outcome" required></textarea>
            <input type="text" value={keyMetrics} onChange={e => setKeyMetrics(e.target.value)} placeholder="Key Metrics" required />
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            <input type="url" value={detailedBriefLink} onChange={e => setDetailedBriefLink(e.target.value)} placeholder="Link to Detailed Brief" />
            <button type="submit">Create Initiative</button>
        </form>
    );
};

export default InitiativeForm;
