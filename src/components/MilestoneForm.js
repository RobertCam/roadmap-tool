import React, { useState } from 'react';
import axios from 'axios';

const MilestoneForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');
    const [githubLink, setGithubLink] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/milestones`, {
            name,
            description,
            startDate,
            endDate,
            status,
            githubLink,
        })
        .then(response => {
            console.log('Milestone created successfully:', response.data);
            // Clear the form after submission
            setName('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setStatus('');
            setGithubLink('');
        })
        .catch(error => {
            console.error('There was an error creating the milestone!', error);
        });
    };

    return (
        <div className="container">
            <h2>Create New Milestone</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="name">Milestone Name</label>
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
                <div className="input-field">
                    <input
                        id="githubLink"
                        type="url"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                    />
                    <label htmlFor="githubLink">GitHub Link</label>
                </div>
                <button type="submit" className="btn waves-effect waves-light">Add Milestone</button>
            </form>
        </div>
    );
};

export default MilestoneForm;
