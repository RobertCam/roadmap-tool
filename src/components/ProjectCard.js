import React, { useState } from 'react';
import MilestoneCard from './MilestoneCard';

const ProjectCard = ({ project, view }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div className="project-card">
            <div className="project-header" onClick={toggleExpand}>
                <h4>{project.name}</h4>
                <p>{project.description}</p>
                <Link to={`/edit-project/${project.id}`} className="btn-small">Edit</Link>
                <button className="expand-button">{expanded ? 'Collapse' : 'Expand'}</button>
            </div>
            {expanded && (
                <div className="milestone-list">
                    {project.milestones.map(milestone => (
                        <MilestoneCard
                            key={milestone.id}
                            milestone={milestone}
                            view={view}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectCard;
