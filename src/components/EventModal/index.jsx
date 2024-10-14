import React, { useState, useEffect } from 'react';
import useEventValidation from '../useEventValidation';
import './styles.css';

const EventModal = ({ isOpen, onClose, onSubmit, onDelete, initialDate, modalPosition, eventToEdit }) => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState(initialDate || '');
    const [eventTime, setEventTime] = useState('');
    const [eventNotes, setEventNotes] = useState('');
    const [eventColor, setEventColor] = useState('#3174ad');

    const { errors, validateForm } = useEventValidation();

    useEffect(() => {
        if (eventToEdit) {
            setEventName(eventToEdit.title);
            setEventDate(eventToEdit.start.toISOString().split('T')[0]);
            setEventTime(eventToEdit.start.toTimeString().slice(0, 5));
            setEventNotes(eventToEdit.description);
            setEventColor(eventToEdit.color || '#3174ad');
        } else if (initialDate) {
            setEventDate(initialDate);
            setEventName('');
            setEventTime('');
            setEventNotes('');
            setEventColor('#3174ad');
        }
    }, [eventToEdit, initialDate]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { isValid, errors: validationErrors } = validateForm(eventName, eventDate, eventTime, eventNotes);
        if (isValid) {
            const startDate = new Date(`${eventDate}T${eventTime}`);
            const newEvent = {
                id: eventToEdit ? eventToEdit.id : Date.now(),
                title: eventName,
                start: startDate,
                end: startDate,
                description: eventNotes,
                color: eventColor,
            };
            onSubmit(newEvent, !!eventToEdit);
            onClose();
        } else {
            console.error(validationErrors);
        }
    };

    const handleDelete = () => {
        if (eventToEdit) {
            onDelete(eventToEdit.id);
            onClose();
        }
    };

    useEffect(() => {
        if (!isOpen) {
            setEventName('');
            setEventDate(initialDate || '');
            setEventTime('');
            setEventNotes('');
        }
    }, [isOpen, initialDate]);

    return (
        <>
            {isOpen && <div className="backdrop" />}
            <div className={`modal ${isOpen ? 'open' : ''}`} style={{ top: modalPosition.top, left: modalPosition.left }}>
                <div className="modal-content">
                    <button className="close-button" onClick={onClose}>&times;</button>
                    <form onSubmit={handleFormSubmit}>
                        <label>event name</label>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                        />
                        {errors.name && <span className="error">{errors.name}</span>}

                        <label>event date</label>
                        <input
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                        />
                        {errors.date && <span className="error">{errors.date}</span>}

                        <label>event time</label>
                        <input
                            type="time"
                            value={eventTime}
                            onChange={(e) => setEventTime(e.target.value)}
                        />
                        {errors.time && <span className="error">{errors.time}</span>}

                        <label>notes</label>
                        <input
                            value={eventNotes}
                            onChange={(e) => setEventNotes(e.target.value)}
                        />
                        {errors.notes && <span className="error">{errors.notes}</span>}

                        <label>color</label>
                        <input
                            type="color"
                            value={eventColor}
                            onChange={(e) => setEventColor(e.target.value)}
                        />

                        <div className="button_wrp">
                            {eventToEdit && <button type="button" onClick={handleDelete} className="delete-button">DISCARD</button>}
                            {!eventToEdit && <button type="button" onClick={onClose}>Cancel</button>}
                            <button type="submit">{eventToEdit ? 'EDIT' : 'Save'}</button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EventModal;
