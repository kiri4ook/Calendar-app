import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import EventModal from '../EventModal';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import './styles.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({ events, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalPosition, setModalPosition] = useState({});
    const [eventToEdit, setEventToEdit] = useState(null);


    const handleSelectSlot = ({ start, box }) => {
        if (!modalIsOpen) {
            setSelectedDate(moment(start).format('YYYY-MM-DD'));
            setEventToEdit(null);
            setModalPosition({
                top: box.y + 10 + 'px',
                left: box.x - 125 + 'px',
            });
            setModalIsOpen(true);
        }
    };

    const handleEventClick = (event, e) => {
        if (!modalIsOpen) {
            const { clientX, clientY } = e.nativeEvent;
            setSelectedDate(moment(event.start).format('YYYY-MM-DD'));
            setEventToEdit(event);
            setModalPosition({
                top: clientY + 10 + 'px',
                left: clientX - 125 + 'px',
            });
            setModalIsOpen(true);
        }
    };

    const handleEventDrop = ({ event, start, end, allDay }) => {
        const updatedEvent = { ...event, start, end, allDay };
        onUpdateEvent(updatedEvent);
    };

    const handleEventResize = ({ event, start, end }) => {
        const resizedEvent = { ...event, start, end };
        onUpdateEvent(resizedEvent);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEventToEdit(null);
        setSelectedDate(null);
    };

    return (
        <div className="calendar-container">
            <h1>Calendar View</h1>
            <DragAndDropCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleEventClick}
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
                eventPropGetter={(event) => ({
                    style: { backgroundColor: event.color || '#3174ad' },
                })}
                resizable
            />
            <EventModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                onSubmit={(event, isEdit) => isEdit ? onUpdateEvent(event) : onAddEvent(event)}
                onDelete={onDeleteEvent}
                initialDate={selectedDate}
                modalPosition={modalPosition}
                eventToEdit={eventToEdit}
            />
        </div>
    );
};

export default CalendarComponent;




