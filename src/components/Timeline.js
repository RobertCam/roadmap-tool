import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import axios from 'axios';

const TimelineView = () => {
    const [initiatives, setInitiatives] = useState([]);
    const [timeScale, setTimeScale] = useState('month'); // Default time scale
    const timelineRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        fetchInitiatives();
    }, [location.state?.refresh]); // Re-fetch when navigating with a refresh state

    const fetchInitiatives = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/initiatives`);
            setInitiatives(response.data);
        } catch (error) {
            console.error('Error fetching initiatives:', error);
        }
    };

    const groups = initiatives.map(initiative => ({
        id: initiative.id,
        title: initiative.name,
    }));

    const items = initiatives.flatMap(initiative =>
        initiative.projects.map(project => ({
            id: project.id,
            group: initiative.id,
            title: project.name,
            start_time: moment(project.start_date),
            end_time: moment(project.end_date),
        }))
    );

    const defaultTimeStart = moment().startOf('month').toDate();
    const defaultTimeEnd = moment().endOf('month').toDate();

    const handleTimeScaleChange = (scale) => {
        setTimeScale(scale);

        let start, end;

        switch (scale) {
            case 'week':
                start = moment().startOf('week').toDate();
                end = moment().endOf('week').toDate();
                break;
            case 'month':
                start = moment().startOf('month').toDate();
                end = moment().endOf('month').toDate();
                break;
            case 'quarter':
                start = moment().startOf('quarter').toDate();
                end = moment().endOf('quarter').toDate();
                break;
            default:
                start = moment().startOf('month').toDate();
                end = moment().endOf('month').toDate();
                break;
        }

        timelineRef.current.updateScrollCanvas(start, end);
    };

    return (
        <div>
            <div className="timeline-controls">
                <button onClick={() => handleTimeScaleChange('week')}>Week</button>
                <button onClick={() => handleTimeScaleChange('month')}>Month</button>
                <button onClick={() => handleTimeScaleChange('quarter')}>Quarter</button>
            </div>
            <Timeline
                ref={timelineRef}
                groups={groups}
                items={items}
                defaultTimeStart={defaultTimeStart}
                defaultTimeEnd={defaultTimeEnd}
                lineHeight={50}
            />
        </div>
    );
};

export default TimelineView;
