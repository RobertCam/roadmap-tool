import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Link } from 'react-router-dom';

const InitiativeCard = ({ initiative, view }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => setExpanded(!expanded);

    return (
        <div className="initiative-card">
            <div className="initiative-header" onClick={toggleExpand}>
                <h3>{initiative.name}</h3>
                <p>{initiative.description}</p>
                <Link to={`/edit-initiative/${initiative.id}`} className="btn-small">Edit</Link>
                <button className="expand-button">{expanded ? 'Collapse' : 'Expand'}</button>
            </div>
            {expanded && (
                <div className="project-list">
                    {initiative.projects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            view={view}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default InitiativeCard;
