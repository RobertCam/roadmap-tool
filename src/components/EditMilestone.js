import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMilestone = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [milestone, setMilestone] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        status: '',
        github_link: '',
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
                <div className="input-field">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={milestone.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={milestone.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        name="start_date"
                        value={milestone.start_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        name="end_date"
                        value={milestone.end_date}
                        onChange={handleChange}
                    />
                </div>
                {/* Add other fields as necessary */}
                <button type="submit" className="btn">Update Milestone</button>
            </form>
        </div>
    );
};

export default EditMilestone;
