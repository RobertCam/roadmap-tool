import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MilestoneForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [githubLink, setGithubLink] = useState('');
    const [projectId, setProjectId] = useState('');
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/projects')
            .then(response => setProjects(response.data))
            .catch(error => console.error('There was an error fetching the projects!', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const milestone = {
            name,
            description,
            startDate,
            endDate,
            status,
            githubLink,
            projectId
        };

        axios.post('http://localhost:5000/api/milestones', milestone)
            .then(response => {
                console.log(response.data);
                // Reset form after submission
                setName('');
                setDescription('');
                setStartDate('');
                setEndDate('');
                setStatus('');
                setGithubLink('');
                setProjectId('');
            })
            .catch(error => console.error('There was an error creating the milestone!', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Milestone</h2>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required></textarea>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
            <input type="text" value={status} onChange={e => setStatus(e.target.value)} placeholder="Status" required />
            <input type="url" value={githubLink} onChange={e => setGithubLink(e.target.value)} placeholder="Link to GitHub" />
            <select value={projectId} onChange={e => setProjectId(e.target.value)} required>
                <option value="">Select Project</option>
                {projects.map(project => (
                    <option key={project.id} value={project.id}>{project.name}</option>
                ))}
            </select>
            <button type="submit">Create Milestone</button>
        </form>
    );
};

export default MilestoneForm;
