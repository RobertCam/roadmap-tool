import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MilestoneForm = ({ isEdit }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [milestone, setMilestone] = useState({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
        status: '',
        github_link: '',
        project_id: ''
    });

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        if (isEdit) {
            fetchMilestone();
        }
        fetchProjects();
    }, [isEdit]);

    const fetchMilestone = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/milestones/${id}`);
            setMilestone(response.data);
        } catch (error) {
            console.error('Error fetching milestone:', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
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
            if (isEdit) {
                await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/milestones/${id}`, milestone);
            } else {
                await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/milestones`, milestone);
            }
            navigate('/timeline');
        } catch (error) {
            console.error('Error submitting milestone:', error);
        }
    };

    return (
        <div className="container">
            <h2>{isEdit ? "Edit" : "Create"} Milestone</h2>
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

                    <div className="input-field col s12">
                        <label htmlFor="project_id">Link to Project</label>
                        <select name="project_id" id="project_id" value={milestone.project_id} onChange={handleChange}>
                            <option value="" disabled>Select a Project</option>
                            {projects.map(project => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col s12">
                        <button type="submit" className="btn">{isEdit ? "Update" : "Create"} Milestone</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MilestoneForm;
