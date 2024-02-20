import workshop from './../img/workshop_big.png';
import activity from './../img/activity_big.png';
import tech_talk from './../img/tech_talk_big.png';
import './../style/eventDetails.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useQuery, gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

function EventDetails({ eventId }) {
    const client = useApolloClient();
    const [eventData, setEventData] = useState(null);
    const [relatedEventData, setRelatedEventData] = useState([]);
    const [relatedEventIds, setRelatedEventIds] = useState(null);

    useEffect(() => {
        const url = `https://api.hackthenorth.com/v3/events/${eventId}`;
        const fetchData = async () => {
            try {
                const response = await axios(url);
                const data = response.data;
                setEventData(data);
                const ids = data.related_events.map(relatedEvent => parseInt(relatedEvent));
                setRelatedEventIds(ids);
            } catch (error) {
                console.log(error.response);
            }
        };
        fetchData();

    }, [eventId]);

    useEffect(() => {
        const fetchNames = async () => {
            if (relatedEventIds) {
                const promises = relatedEventIds.map(async (eventId) => {
                    console.log(eventId);
                    const { data } = await await axios.get(`https://api.hackthenorth.com/v3/events/${eventId}`);
                    console.log(data);
                    return data;
                });

                const names = await Promise.all(promises);
                setRelatedEventData(names);
                console.log(relatedEventData);
            }
        };

        fetchNames();
    }, [relatedEventIds]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const month = date.toLocaleString('default', { month: 'short' });
        const day = date.getDate();
        return `${month} ${day}`;
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const formatImage = (type) => {
        if (type === 'workshop')
            return <img src={workshop} className='App__section-event-image' alt='logo' />;
        else if (type === 'activity')
            return <img src={activity} className='App__section-event-image' alt='logo' />;
        else
            return <img src={tech_talk} className='App__section-event-image' alt='logo' />;
    };

    return (
        <div className='eventDetails' >
            {eventData ? (
                <section className='eventDetails__section'>
                    <div className='eventDetails__section-top'>
                        <div>
                            <div className='eventDetails__section-event-image'>{formatImage(eventData.event_type)}</div>
                        </div>
                        <div>
                            <h3>Related Events</h3>
                            {relatedEventData.map((relatedEvent) => (
                                <Link to={`/event${relatedEvent.id}`}>
                                    <div key={relatedEvent.id}>
                                        <h4>{relatedEvent.name}</h4>
                                    </div>
                                </Link>
                            ))}

                        </div>
                        <div>
                            <h5>{formatDate(eventData.start_time)} {formatTime(eventData.start_time)} - {formatTime(eventData.end_time)}| {eventData.permission} Speakers: {eventData.speakers.map(speaker => speaker.name).join(', ')}</h5>
                            <h2 className='eventDetails__section-event-name'>{eventData.name}</h2>
                            <h5>{eventData.description}</h5>
                            <div><h5>Public: {eventData.public_url}</h5></div>
                            <div><h5>Private: {eventData.private_url}</h5></div>
                        </div>
                    </div>
                </section>
            ) : (
                <p>Loading...</p>
            )}
        </div>

    );
};

export default EventDetails;