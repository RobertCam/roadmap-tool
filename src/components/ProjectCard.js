import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{project.name}</span>

                {/* Description Section */}
                <div className="card-section">
                    <h5>Description</h5>
                    <p>{project.description}</p>
                </div>

                {/* Problem Section */}
                <div className="card-section">
                    <h5>Problem Statement</h5>
                    <p>{project.problem_statement}</p>
                </div>

                {/* Hypothesis Section */}
                <div className="card-section">
                    <h5>Hypothesis</h5>
                    <p>{project.hypothesis}</p>
                </div>

                {/* Status Section */}
                <div className="card-section">
                    <h5>Status</h5>
                    <p>{project.status}</p>
                </div>

                {/* Dates Section */}
                <div className="card-section">
                    <h5>Timeline</h5>
                    <p><strong>Start Date:</strong> {new Date(project.start_date).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(project.end_date).toLocaleDateString()}</p>
                </div>

                {/* Links Section */}
                {project.project_brief_link && (
                    <div className="card-section">
                        <h5>Project Brief</h5>
                        <a href={project.project_brief_link} target="_blank" rel="noopener noreferrer">View Project Brief</a>
                    </div>
                )}

                {project.design_board_link && (
                    <div className="card-section">
                        <h5>Design Board</h5>
                        <a href={project.design_board_link} target="_blank" rel="noopener noreferrer">View Design Board</a>
                    </div>
                )}

                {/* Related Milestones */}
                {project.milestones && project.milestones.length > 0 && (
                    <div className="card-section">
                        <h5>Related Milestones</h5>
                        <ul>
                            {project.milestones.map(milestone => (
                                <li key={milestone.id}>
                                    <Link to={`/milestones/${milestone.id}`}>{milestone.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Linked Initiative */}
                {project.initiative_id && (
                    <div className="card-section">
                        <h5>Linked Initiative</h5>
                        <Link to={`/initiatives/${project.initiative_id}`}>View Initiative</Link>
                    </div>
                )}
            </div>
            <div className="card-action">
                <Link to={`/edit/project/${project.id}`} className="btn-small">Edit</Link>
            </div>
        </div>
    );
};

export default ProjectCard;
