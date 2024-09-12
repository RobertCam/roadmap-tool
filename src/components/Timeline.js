import React, { useState, useEffect, useRef } from 'react';
import { DataSet, Timeline } from 'vis-timeline/standalone';
import 'vis-timeline/styles/vis-timeline-graph2d.min.css';
import axios from 'axios';

const TimelineView = () => {
    const [initiatives, setInitiatives] = useState([]); // Ensure initiatives is initialized as an empty array
    const timelineRef = useRef(null);

    useEffect(() => {
        fetchInitiatives();
    }, []);

    const fetchInitiatives = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`);
            setInitiatives(response.data || []); // Ensure response data is an array or fallback to an empty array
        } catch (error) {
            console.error('Error fetching initiatives:', error);
        }
    };

    useEffect(() => {
        if (initiatives.length > 0) {
            const container = timelineRef.current;

            // Prepare groups (initiatives) and items (projects)
            const groups = initiatives.map((initiative) => ({
                id: initiative.id,
                content: initiative.name,
            }));

            const items = initiatives.flatMap((initiative) =>
                initiative.projects.map((project) => ({
                    id: project.id,
                    group: initiative.id,
                    content: project.name,
                    start: project.start_date,
                    end: project.end_date,
                }))
            );

            // Create DataSet for groups and items
            const timelineGroups = new DataSet(groups);
            const timelineItems = new DataSet(items);

            const options = {
                editable: false,
                selectable: true,
                stack: true,
                start: new Date(),
                end: new Date(new Date().setMonth(new Date().getMonth() + 1)),
                zoomable: true,
                margin: { item: 20 },
            };

            // Initialize the timeline
            const timeline = new Timeline(container, timelineItems, timelineGroups, options);

            // Clean up timeline on unmount
            return () => {
                if (timeline) {
                    timeline.destroy();
                }
            };
        }
    }, [initiatives]); // Only run the effect when initiatives data changes

    return (
        <div>
            {/* Check if there are initiatives to display */}
            {initiatives.length === 0 ? (
                <p>Loading timeline...</p>
            ) : (
                <div ref={timelineRef} style={{ height: '500px' }} />
            )}
        </div>
    );
};

export default TimelineView;
