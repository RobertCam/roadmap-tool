import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`)
            .then(response => setProjects(response.data))
            .catch(error => console.error('There was an error fetching the projects!', error));
    }, []);

    return (
        <div className="container">
            <h2>Projects</h2>
            <div className="row">
                {projects.map(project => (
                    <div className="col s12 m6 l4" key={project.id}>
                        <div className="card">
                            <div className="card-content">
                                <span className="card-title">{project.name}</span>
                                <p>{project.description}</p>
                            </div>
                            <div className="card-action">
                                <a href="#">View More</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectList;
