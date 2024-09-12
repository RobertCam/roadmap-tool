import React, { useState, useEffect, useRef } from 'react';
import { Timeline } from 'vis-timeline/standalone';
import axios from 'axios';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import './Timeline.css'; // Ensure this is correctly imported

const TimelineView = () => {
    const timelineRef = useRef(null);
    const timelineInstance = useRef(null);
    const [initiatives, setInitiatives] = useState([]);
    const [projects, setProjects] = useState([]);
    const [milestones, setMilestones] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const initiativeResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`);
            setInitiatives(initiativeResponse.data);

            const projectResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);
            setProjects(projectResponse.data);

            const milestoneResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/milestones`);
            setMilestones(milestoneResponse.data);

            renderTimeline(initiativeResponse.data, projectResponse.data, milestoneResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const initiativeColors = {
        1: { project: '#4CAF50', milestone: '#FF9800' },  // Colors for Initiative 1
        2: { project: '#2196F3', milestone: '#FFC107' },  // Colors for Initiative 2
        3: { project: '#9C27B0', milestone: '#E91E63' },  // Colors for Initiative 3
        // Add more initiatives and their corresponding colors
    };
    
    const renderTimeline = (initiatives, projects, milestones) => {
        if (timelineInstance.current) {
            timelineInstance.current.destroy();
        }
    
        const container = timelineRef.current;
    
        const groups = initiatives.map(initiative => ({
            id: `initiative-${initiative.id}`,
            content: `<div class="initiative-group">${initiative.name}</div>`,
        }));
    
        const items = [
            ...projects.map((project, index) => ({
                id: `project-${project.id}`,
                group: `initiative-${project.initiative_id}`,
                content: `<div class="timeline-item project-item">${project.name}</div>`,
                start: new Date(project.start_date).getTime(),
                end: new Date(project.end_date).getTime(),
                type: 'range',
                subgroup: 'project',
                className: 'project-item',
                subgroupOrder: index,
                style: `background-color: ${initiativeColors[project.initiative_id].project}; color: white;`,  // Project-specific color
            })),
            ...milestones.map((milestone, index) => ({
                id: `milestone-${milestone.id}`,
                group: `initiative-${projects.find(p => p.id === milestone.project_id).initiative_id}`,
                content: `<div class="timeline-item milestone-item">${milestone.name}</div>`,
                start: new Date(milestone.start_date).getTime(),
                type: 'box',
                subgroup: 'milestone',
                className: 'milestone-item',
                subgroupOrder: index,
                style: `background-color: ${initiativeColors[projects.find(p => p.id === milestone.project_id).initiative_id].milestone}; color: white;`,  // Milestone-specific color
            })),
        ];
    
        const options = {
            stack: false,
            start: new Date().getTime(),
            end: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime(),
            groupOrder: 'content',
            margin: {
                item: {
                    horizontal: 10,
                    vertical: 20,  // Adjusted vertical margin for spacing at the bottom
                },
            },
            align: 'center',
            orientation: 'top',
            editable: true,
            zoomable: true,
        };
    
        timelineInstance.current = new Timeline(container, items, groups, options);
    };
    

    return (
        <div>
            <h1>Timeline View</h1>
            <div ref={timelineRef} style={{ height: '500px' }} />
        </div>
    );
};

export default TimelineView;
