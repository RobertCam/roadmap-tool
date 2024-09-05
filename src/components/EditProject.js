import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState({
        name: '',
        description: '',
        problem_statement: '',
        hypothesis: '',
        start_date: '',
        end_date: '',
        status: '',
        project_brief_link: '',
        design_board_link: ''
    });

    useEffect(() => {
        fetchProject();
    }, []);

    const fetchProject = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${id}`);
            setProject(response.data);
        } catch (error) {
            console.error('Error fetching project:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({
            ...project,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${id}`, project);
            navigate('/timeline');
        } catch (error) {
            console.error('Error updating project:', error);
        }
    };

    return (
        <div className="container">
            <h2>Edit Project</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={project.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="materialize-textarea"
                            value={project.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="problem_statement">Problem Statement</label>
                        <textarea
                            id="problem_statement"
                            name="problem_statement"
                            className="materialize-textarea"
                            value={project.problem_statement}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="hypothesis">Hypothesis</label>
                        <textarea
                            id="hypothesis"
                            name="hypothesis"
                            className="materialize-textarea"
                            value={project.hypothesis}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="start_date">Start Date</label>
                        <input
                            type="date"
                            id="start_date"
                            name="start_date"
                            value={project.start_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s6">
                        <label htmlFor="end_date">End Date</label>
                        <input
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={project.end_date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="status">Status</label>
                        <input
                            type="text"
                            id="status"
                            name="status"
                            value={project.status}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="project_brief_link">Project Brief Link</label>
                        <input
                            type="url"
                            id="project_brief_link"
                            name="project_brief_link"
                            value={project.project_brief_link}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-field col s12">
                        <label htmlFor="design_board_link">Design Board Link</label>
                        <input
                            type="url"
                            id="design_board_link"
                            name="design_board_link"
                            value={project.design_board_link}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col s12">
                        <button type="submit" className="btn">Update Project</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProject;
