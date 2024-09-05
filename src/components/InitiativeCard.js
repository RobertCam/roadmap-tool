import React from 'react';
import { Link } from 'react-router-dom';

const InitiativeCard = ({ initiative }) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{initiative.name}</span>

                {/* Description Section */}
                <div className="card-section">
                    <h5>Description</h5>
                    <p>{initiative.description}</p>
                </div>

                {/* Problem Section */}
                <div className="card-section">
                    <h5>Problem Statement</h5>
                    <p>{initiative.problem}</p>
                </div>

                {/* Desired Outcome Section */}
                <div className="card-section">
                    <h5>Desired Outcome</h5>
                    <p>{initiative.desired_outcome}</p>
                </div>

                {/* Key Metrics Section */}
                <div className="card-section">
                    <h5>Key Metrics</h5>
                    <p>{initiative.key_metrics}</p>
                </div>

                {/* Dates Section */}
                <div className="card-section">
                    <h5>Timeline</h5>
                    <p><strong>Start Date:</strong> {new Date(initiative.start_date).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(initiative.end_date).toLocaleDateString()}</p>
                </div>

                {/* Link to Detailed Brief */}
                {initiative.detailed_brief_link && (
                    <div className="card-section">
                        <h5>Detailed Brief</h5>
                        <a href={initiative.detailed_brief_link} target="_blank" rel="noopener noreferrer">View Brief</a>
                    </div>
                )}

                {/* Related Projects Section */}
                {initiative.projects && initiative.projects.length > 0 && (
                    <div className="card-section">
                        <h5>Related Projects</h5>
                        <ul>
                            {initiative.projects.map(project => (
                                <li key={project.id}>
                                    <Link to={`/projects/${project.id}`}>{project.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="card-action">
                <Link to={`/edit/initiative/${initiative.id}`} className="btn-small">Edit</Link>
            </div>
        </div>
    );
};

export default InitiativeCard;
