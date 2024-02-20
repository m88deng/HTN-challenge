import workshop from './../img/workshop.png';
import activity from './../img/activity.png';
import tech_talk from './../img/tech_talk.png';
import { Link } from 'react-router-dom';
import './../style/app.css';


import { useQuery, gql } from '@apollo/client';

const GET_EVENTS_QUERY = gql`
  {
    sampleEvents {
      id
      name
      event_type
      permission
      start_time
      end_time
    #   description
    #   speakers {
    #     name
    #   }
    #   public_url
    #   private_url
    #   related_events
    }
  }
`

export default function Events({ isLoggedIn, filterEvent }) {

    const { data, loading, error } = useQuery(GET_EVENTS_QUERY);
    if (loading) return "Loading";
    if (error) return <pre>{error.message}</pre>

    const sortedEvents = [...data.sampleEvents].sort((a, b) => {
        if (a.start_time !== b.start_time) {
            return a.start_time - b.start_time; // Sort by start_time
        } else {
            return a.end_time - b.end_time; // If start_time is the same, sort by end_time
        }
    });


    let displayedEvents;
    if (!isLoggedIn) {
        displayedEvents = sortedEvents.filter(event => event.permission === 'public');
    } else {
        displayedEvents = sortedEvents;
    }

    if(filterEvent){ //add filter
        displayedEvents = displayedEvents.filter(event => event.event_type===filterEvent);
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

    // console.log(displayedEvents);
    return (
        <div className='App'>

            <section className='App__section'>
                <div className='App__section-top'>
                    <h2>Events</h2>
                </div>
                <div className='App__section-bottom'>
                    {displayedEvents.map((e) => (
                        <div key={e.id} className='App__section-event'>
                            <Link to={`/event${e.id}`}>
                            <div>{formatImage(e.event_type)}</div>
                            </Link>
                            <div className='App__section-event-time'>
                                {formatDate(e.start_time)} &ensp;|&ensp; {formatTime(e.start_time)} - {formatTime(e.end_time)}
                            </div>
                            <div className='App__section-event-name'><h4>{e.name}</h4></div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};