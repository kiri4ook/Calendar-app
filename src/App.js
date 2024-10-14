import React, { useEffect, useState } from 'react';
import CalendarComponent from './components/Calendar';
import { getEvents, addEvent, updateEvent, deleteEvent } from './storage';


const App = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(getEvents());
  }, []);

  const handleAddEvent = (newEvent) => {
    addEvent(newEvent);
    setEvents(getEvents());
  };

  const handleUpdateEvent = (updatedEvent) => {
    updateEvent(updatedEvent.id, updatedEvent);
    setEvents(getEvents());
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId);
    setEvents(getEvents());
  };

  return (
    <div>
      <CalendarComponent
        events={events}
        onAddEvent={handleAddEvent}
        onUpdateEvent={handleUpdateEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

export default App;


