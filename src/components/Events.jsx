import React from 'react';
import './Events.css';

const Events = () => {
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        fetch('http://localhost:5000/api/events')
            .then(res => res.json())
            .then(data => setEvents(data))
            .catch(err => console.error("Error fetching events:", err));
    }, []);

    return (
        <section id="events" className="section-padding">
            <div className="container">
                <h2 className="section-title text-center">Upcoming Events</h2>
                <div className="events-grid">
                    {events.map((e, index) => (
                        <div key={index} className="event-card">
                            <div className="event-date">{e.date}</div>
                            <h3>{e.title}</h3>
                            <p>{e.desc}</p>
                            <button className="read-more">Details &rarr;</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
