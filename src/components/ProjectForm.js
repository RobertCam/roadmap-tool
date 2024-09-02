import React, { useState } from 'react';
import axios from 'axios';

const ProjectForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [problemStatement, setProblemStatement] = useState('');
    const [hypothesis, setHypothesis] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/projects`, {
            name,
            description,
            problemStatement,
            hypothesis,
            startDate,
            endDate,
            status,
        })
        .then(response => {
            console.log('Project created successfully:', response.data);
            // Clear the form after submission
            setName('');
            setDescription('');
            setProblemStatement('');
            setHypothesis('');
            setStartDate('');
            setEndDate('');
            setStatus('');
        })
        .catch(error => {
            console.error('There was an error creating the project!', error);
        });
    };

    return (
        <div className="container">
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="name">Project Name</label>
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
                        id="problemStatement"
                        className="materialize-textarea"
                        value={problemStatement}
                        onChange={(e) => setProblemStatement(e.target.value)}
                        required
                    />
                    <label htmlFor="problemStatement">Problem Statement</label>
                </div>
                <div className="input-field">
                    <textarea
                        id="hypothesis"
                        className="materialize-textarea"
                        value={hypothesis}
                        onChange={(e) => setHypothesis(e.target.value)}
                        required
                    />
                    <label htmlFor="hypothesis">Hypothesis</label>
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
                <div className="input-field">
                    <input
                        id="status"
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                    />
                    <label htmlFor="status">Status</label>
                </div>
                <button type="submit" className="btn waves-effect waves-light">Add Project</button>
            </form>
        </div>
    );
};

export default ProjectForm;
