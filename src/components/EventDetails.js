import workshop from './../img/workshop_big.png';
import activity from './../img/activity_big.png';
import tech_talk from './../img/tech_talk_big.png';
import './../style/eventDetails.css';

import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useQuery, gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

function EventDetails({ eventId, isLoggedIn }) {
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

    if(eventData){
        if(permission === 'private' && !isLoggedIn){
            navigate("/access-denied");
        }
    }

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

    const formatURL = (generalURL) => {
        if (generalURL) {
            return <h5>Public: {generalURL}</h5>
        }
        return null;
    };
    const formatPrivateURL = (permission, privateURL) => {
        if (permission === 'private') {
            return <p>{privateURL}</p>
        }
        return null;
    };

    return (
        <div className='eventDetails' >
            {eventData ? (
                <section className='eventDetails__section'>
                    <div className='eventDetails__section-top'>
                        <div>
                            <div>{formatImage(eventData.event_type)}</div>
                        </div>
                        <div className='eventDetails__section-time'>
                            <h2 className='eventDetails__section-time-day'>{formatDate(eventData.start_time)}</h2>
                            <h3 className='eventDetails__section-time-hour'>{formatTime(eventData.start_time)} - {formatTime(eventData.end_time)}</h3>
                            <h5>{formatURL(eventData.general_url)}</h5>
                        </div>
                    </div>
                    <div className='eventDetails__section-middle'>
                        <div>
                            <p>{formatPrivateURL(eventData.permission, eventData.private_url)}</p>
                            <h2>{eventData.name}</h2>
                            <p>{eventData.description}</p>
                            <h5>  Speakers: {eventData.speakers.map(speaker => speaker.name).join(', ')}</h5>
                        </div>
                        <div className='eventDetails__section-event-related'>
                            <div className='eventDetails__section-event-related-title'>Related Events</div>
                            {relatedEventData.map((relatedEvent) => (
                                <Link to={`/event${relatedEvent.id}`}>
                                    <div key={relatedEvent.id}>
                                        <li className='eventDetails__section-event-related-link'>{relatedEvent.name}</li>
                                    </div>
                                </Link>
                            ))}
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