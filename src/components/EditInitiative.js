import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditInitiative = () => {
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
        fetchInitiative();
    }, []);

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
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives/${id}`, initiative);
            navigate('/timeline');
        } catch (error) {
            console.error('Error updating initiative:', error);
        }
    };

    return (
        <div className="container">
            <h2>Edit Initiative</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-field">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={initiative.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={initiative.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        name="start_date"
                        placeholder="Start Date"
                        value={initiative.start_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        name="end_date"
                        placeholder="End Date"
                        value={initiative.end_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        name="problem"
                        placeholder="Problem"
                        value={initiative.problem}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        name="desired_outcome"
                        placeholder="Desired Outcome"
                        value={initiative.desired_outcome}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        name="key_metrics"
                        placeholder="Key Metrics"
                        value={initiative.key_metrics}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="url"
                        name="detailed_brief_link"
                        placeholder="Detailed Brief Link"
                        value={initiative.detailed_brief_link}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn">Update Initiative</button>
            </form>
        </div>
    );
};

export default EditInitiative;
