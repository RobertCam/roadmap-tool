import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [problemStatement, setProblemStatement] = useState('');
    const [hypothesis, setHypothesis] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [projectBriefLink, setProjectBriefLink] = useState('');
    const [designBoardLink, setDesignBoardLink] = useState('');
    const [initiativeId, setInitiativeId] = useState('');
    const [initiatives, setInitiatives] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`)
            .then(response => setInitiatives(response.data))
            .catch(error => console.error('There was an error fetching the initiatives!', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const project = {
            name,
            description,
            problemStatement,
            hypothesis,
            startDate,
            endDate,
            status,
            projectBriefLink,
            designBoardLink,
            initiativeId
        };

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/projects`, project)
            .then(response => {
                console.log(response.data);
                // Reset form after submission
                setName('');
                setDescription('');
                setProblemStatement('');
                setHypothesis('');
                setStartDate('');
                setEndDate('');
                setStatus('');
                setProjectBriefLink('');
                setDesignBoardLink('');
                setInitiativeId('');
            })
            .catch(error => console.error('There was an error creating the project!', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Project</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required></textarea>
            <textarea value={problemStatement} onChange={e => setProblemStatement(e.target.value)} placeholder="Problem Statement" required></textarea>
            <textarea value={hypothesis} onChange={e => setHypothesis(e.target.value)} placeholder="Hypothesis" required></textarea>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            <input type="text" value={status} onChange={e => setStatus(e.target.value)} placeholder="Status" required />
            <input type="url" value={projectBriefLink} onChange={e => setProjectBriefLink(e.target.value)} placeholder="Link to Project Brief" />
            <input type="url" value={designBoardLink} onChange={e => setDesignBoardLink(e.target.value)} placeholder="Link to Design Board" />
            <select value={initiativeId} onChange={e => setInitiativeId(e.target.value)} required>
                <option value="">Select Initiative</option>
                {initiatives.map(initiative => (
                    <option key={initiative.id} value={initiative.id}>{initiative.name}</option>
                ))}
            </select>
            <button type="submit">Create Project</button>
        </form>
    );
};

export default ProjectForm;
