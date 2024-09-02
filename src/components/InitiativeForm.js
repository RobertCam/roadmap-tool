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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`, {
            name,
            description,
            problem,
            desiredOutcome,
            keyMetrics,
            startDate,
            endDate,
        })
        .then(response => {
            console.log('Initiative created successfully:', response.data);
            // Clear the form after submission
            setName('');
            setDescription('');
            setProblem('');
            setDesiredOutcome('');
            setKeyMetrics('');
            setStartDate('');
            setEndDate('');
        })
        .catch(error => {
            console.error('There was an error creating the initiative!', error);
        });
    };

    return (
        <div className="container">
            <h2>Create New Initiative</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="name">Initiative Name</label>
                </div>
                <div className="input-field">
                    <textarea
                        id="description"
                        className="materialize-textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <label htmlFor="description">Description</label>
                </div>
                <div className="input-field">
                    <textarea
                        id="problem"
                        className="materialize-textarea"
                        value={problem}
                        onChange={(e) => setProblem(e.target.value)}
                        required
                    />
                    <label htmlFor="problem">Problem Statement</label>
                </div>
                <div className="input-field">
                    <textarea
                        id="desiredOutcome"
                        className="materialize-textarea"
                        value={desiredOutcome}
                        onChange={(e) => setDesiredOutcome(e.target.value)}
                        required
                    />
                    <label htmlFor="desiredOutcome">Desired Outcome</label>
                </div>
                <div className="input-field">
                    <input
                        id="keyMetrics"
                        type="text"
                        value={keyMetrics}
                        onChange={(e) => setKeyMetrics(e.target.value)}
                        required
                    />
                    <label htmlFor="keyMetrics">Key Metrics</label>
                </div>
                <div className="input-field">
                    <input
                        id="startDate"
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                    <label htmlFor="startDate">Start Date</label>
                </div>
                <div className="input-field">
                    <input
                        id="endDate"
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                    <label htmlFor="endDate">End Date</label>
                </div>
                <button type="submit" className="btn waves-effect waves-light">Add Initiative</button>
            </form>
        </div>
    );
};

export default InitiativeForm;
