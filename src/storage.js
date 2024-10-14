export const addEvent = (event) => {
    const events = getEvents();
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
};

export const updateEvent = (id, updatedEvent) => {
    const events = getEvents();
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        events[index] = { ...events[index], ...updatedEvent };
        localStorage.setItem('events', JSON.stringify(events));
    }
};

export const deleteEvent = (id) => {
    const events = getEvents();
    const updatedEvents = events.filter(event => event.id !== id);
    localStorage.setItem('events', JSON.stringify(updatedEvents));
};

export const getEvents = () => {
    const storedEvents = localStorage.getItem('events');
    if (!storedEvents) return [];

    const events = JSON.parse(storedEvents);

    return events.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
    }));
};

