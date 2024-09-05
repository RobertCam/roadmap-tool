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
        design_board_link: '',
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
                <div className="input-field">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={project.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={project.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        name="start_date"
                        value={project.start_date}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-field">
                    <input
                        type="date"
                        name="end_date"
                        value={project.end_date}
                        onChange={handleChange}
                    />
                </div>
                {/* Add other fields as necessary */}
                <button type="submit" className="btn">Update Project</button>
            </form>
        </div>
    );
};

export default EditProject;
