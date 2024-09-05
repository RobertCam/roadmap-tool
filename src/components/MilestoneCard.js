import React from 'react';
import { Link } from 'react-router-dom';

const MilestoneCard = ({ milestone }) => {
    return (
        <div className="card">
            <div className="card-content">
                <span className="card-title">{milestone.name}</span>

                {/* Description Section */}
                <div className="card-section">
                    <h5>Description</h5>
                    <p>{milestone.description}</p>
                </div>

                {/* Status Section */}
                <div className="card-section">
                    <h5>Status</h5>
                    <p>{milestone.status}</p>
                </div>

                {/* Dates Section */}
                <div className="card-section">
                    <h5>Timeline</h5>
                    <p><strong>Start Date:</strong> {new Date(milestone.start_date).toLocaleDateString()}</p>
                    <p><strong>End Date:</strong> {new Date(milestone.end_date).toLocaleDateString()}</p>
                </div>

                {/* GitHub Link Section */}
                {milestone.github_link && (
                    <div className="card-section">
                        <h5>GitHub Link</h5>
                        <a href={milestone.github_link} target="_blank" rel="noopener noreferrer">View GitHub</a>
                    </div>
                )}

                {/* Linked Project */}
                {milestone.project_id && (
                    <div className="card-section">
                        <h5>Linked Project</h5>
                        <Link to={`/projects/${milestone.project_id}`}>View Project</Link>
                    </div>
                )}
            </div>
            <div className="card-action">
                <Link to={`/edit/milestone/${milestone.id}`} className="btn-small">Edit</Link>
            </div>
        </div>
    );
};

export default MilestoneCard;
