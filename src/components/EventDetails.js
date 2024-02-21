import workshop from './../img/workshop_big.png';
import activity from './../img/activity_big.png';
import tech_talk from './../img/tech_talk_big.png';
import './../style/eventDetails.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function EventDetails({ eventId, isLoggedIn }) {
    const [eventData, setEventData] = useState([]);
    const [relatedEventData, setRelatedEventData] = useState([]);
    const [relatedEventIds, setRelatedEventIds] = useState([]);
    const navigate = useNavigate();

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
                    const { data } = await await axios.get(`https://api.hackthenorth.com/v3/events/${eventId}`);
                    return data;
                });
                const names = await Promise.all(promises);
                setRelatedEventData(names);
            }
        };

        fetchNames();
    }, [relatedEventIds]);

    if (eventData) {
        if (eventData.permission === 'private' && !isLoggedIn) {
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
        if (generalURL && generalURL.length > 0) {
            return <Link to={generalURL}><p className='underline'>{generalURL}</p></Link>;
        }
        return null;
    };
    const formatPrivateURL = (permission, privateURL) => {
        if (permission === 'private') {
            return <Link to={privateURL}><p className='underline'>{privateURL}</p></Link>;
        }
        return null;
    };

    const formatSpakers = (speakers) => {
        if (speakers && speakers.length > 0) {
            return <h5>  Speakers: {eventData.speakers.map(speaker => speaker.name).join(', ')}</h5>;
        }
    };

    return (
        <div className='eventDetails' >
            {eventData ? (
                <section className='eventDetails__section'>
                    <div className='eventDetails__section-top'>
                        <div>
                            <div>{formatImage(eventData.event_type)}</div>
                            <div className='eventDetails__section-name'>
                                <div>{formatPrivateURL(eventData.permission, eventData.private_url)}</div>
                                <h2>{eventData.name}</h2>
                                <p>{eventData.description}</p>
                                <div>{formatSpakers(eventData.speakers)}</div>
                            </div>
                        </div>
                        <div className='eventDetails__section-time'>
                            <div className='eventDetails__section-time-part'>
                                <h2 className='eventDetails__section-time-day'>{formatDate(eventData.start_time)}</h2>
                                <h3 className='eventDetails__section-time-hour'>{formatTime(eventData.start_time)} - {formatTime(eventData.end_time)}</h3>
                                <p className='eventDetails__section-permission'>{eventData.permission} Event <br /></p>
                                <div className='eventDetails__section-publicURL'>{formatURL(eventData.public_url)}</div>
                            </div>
                            <div className='eventDetails__section-event-related'>
                                <div className='eventDetails__section-event-related-title'>Related Events</div>
                                {relatedEventData.map((relatedEvent) => (
                                    <Link to={`/event${relatedEvent.id}`}>
                                        <div key={relatedEvent.id}>
                                            <div className='eventDetails__section-event-related-link underline'>{relatedEvent.name}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
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