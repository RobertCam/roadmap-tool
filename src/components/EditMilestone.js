import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';

const EditMilestone = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [milestone, setMilestone] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        status: '',
        github_link: ''
    });

    useEffect(() => {
        fetchMilestone();
    }, []);

    const fetchMilestone = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/milestones/${id}`);
            setMilestone(response.data);
        } catch (error) {
            console.error('Error fetching milestone:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMilestone({
            ...milestone,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/milestones/${id}`, milestone);
            navigate('/timeline');
        } catch (error) {
            console.error('Error updating milestone:', error);
        }
    };

    return (
        <div className="container">
            <h2>Edit Milestone</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={milestone.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="materialize-textarea"
                            value={milestone.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="start_date">Start Date</label>
                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={milestone.start_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="end_date">End Date</label>
                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={milestone.end_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={milestone.status}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="github_link">GitHub Link</label>
                        <input
                            type="url"
                            id="github_link"
                            name="github_link"
                            value={milestone.github_link}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col s12">
                        <button type="submit" className="btn">Update Milestone</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditMilestone;
