import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const InitiativeForm = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [initiative, setInitiative] = useState({
        name: '',
        description: '',
        problem: '',
        desired_outcome: '',
        key_metrics: '',
        start_date: '',
        end_date: '',
        detailed_brief_link: ''
    });

    useEffect(() => {
        if (isEdit) {
            fetchInitiative();
        }
    }, [isEdit]);

    const fetchInitiative = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives/${id}`);
            setInitiative(response.data);
        } catch (error) {
            console.error('Error fetching initiative:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInitiative({
            ...initiative,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives/${id}`, initiative);
            } else {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`, initiative);
            }
            navigate('/timeline');
        } catch (error) {
            console.error('Error submitting initiative:', error);
        }
    };

    return (
        <div className="container">
            <h2>{isEdit ? "Edit" : "Create"} Initiative</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={initiative.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="materialize-textarea"
                            value={initiative.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="problem">Problem</label>
                        <textarea
                            id="problem"
                            name="problem"
                            className="materialize-textarea"
                            value={initiative.problem}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="desired_outcome">Desired Outcome</label>
                        <textarea
                            id="desired_outcome"
                            name="desired_outcome"
                            className="materialize-textarea"
                            value={initiative.desired_outcome}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="key_metrics">Key Metrics</label>
                        <input
                            type="text"
                            id="key_metrics"
                            name="key_metrics"
                            value={initiative.key_metrics}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="start_date">Start Date</label>
                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={initiative.start_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="end_date">End Date</label>
                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={initiative.end_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="detailed_brief_link">Detailed Brief Link</label>
                        <input
                            type="url"
                            id="detailed_brief_link"
                            name="detailed_brief_link"
                            value={initiative.detailed_brief_link}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col s12">
                        <button type="submit" className="btn">{isEdit ? "Update" : "Create"} Initiative</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default InitiativeForm;
