import { useState } from 'react';

const useEventValidation = () => {
    const [errors, setErrors] = useState({
        name: '',
        date: '',
        time: '',
        notes: ''
    });

    const validateForm = (eventName, eventDate, eventTime, eventNotes) => {
        const newErrors = { name: '', date: '', time: '', notes: '' };
        let isValid = true;

        const currentDate = new Date();
        const eventDateTime = new Date(`${eventDate}T${eventTime}`);

        if (!eventName) {
            newErrors.name = 'Event name is required.';
            isValid = false;
        } else if (eventName.length > 30) {
            newErrors.name = 'Event name cannot exceed 30 characters.';
            isValid = false;
        }
        if (!eventDate) {
            newErrors.date = 'Event date is required.';
            isValid = false;
        } else if (new Date(eventDate).toDateString() === currentDate.toDateString()) {
            if (eventDateTime < currentDate) {
                newErrors.time = 'Event time cannot be in the past for today.';
                isValid = false;
            }
        } else if (new Date(eventDate) < currentDate) {
            newErrors.date = 'Event date cannot be in the past.';
            isValid = false;
        }
        if (!eventTime) {
            newErrors.time = 'Event time is required.';
            isValid = false;
        }
        if (!eventNotes) {
            newErrors.notes = 'Event notes is required.';
            isValid = false;
        }

        setErrors(newErrors);
        return { isValid, errors: newErrors };
    };

    return { errors, validateForm };
};

export default useEventValidation;
