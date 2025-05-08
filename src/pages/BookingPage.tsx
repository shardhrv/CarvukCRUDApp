import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../hooks/useBooking';
import { BookingForm } from '../components/forms/BookingForm';

export const BookingPage: React.FC = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const { user } = useAuth();

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [plate, setPlate] = useState('');

    const { loading, errorMsg, successMsg, book } = useBooking();

    const handleSubmit = () => {
        book({
            userId: user?.id ?? '',
            serviceId: serviceId ?? '',
            date,
            time,
            plate,
        });
    };

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
            <BookingForm
                date={date}
                time={time}
                plate={plate}
                onDateChange={setDate}
                onTimeChange={setTime}
                onPlateChange={setPlate}
                onSubmit={handleSubmit}
                loading={loading}
                errorMsg={errorMsg}
                successMsg={successMsg}/>
        </div>
    );
};