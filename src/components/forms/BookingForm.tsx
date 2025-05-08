import React from 'react';

interface Props {
    date: string;
    time: string;
    plate: string;
    onDateChange: (v: string) => void;
    onTimeChange: (v: string) => void;
    onPlateChange: (v: string) => void;
    onSubmit: () => void;
    loading: boolean;
    errorMsg: string | null;
    successMsg: string | null;
}

export const BookingForm: React.FC<Props> = ({
    date, time, plate,
    onDateChange, onTimeChange, onPlateChange, 
    onSubmit, loading,
    errorMsg, successMsg,
}) => (
    <form onSubmit={e => { e.preventDefault(); onSubmit(); }} 
            className="max-w-md w-full bg-offwhite p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-xl font-bold text-red-800">Book Service</h2>

        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}

        <label className="block">
            Date
            <input
                type="date"
                value={date}
                onChange={e => onDateChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg"/>
        </label>

        <label className="block">
            Time
            <input
                type="time"
                value={time}
                onChange={e => onTimeChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg"/>
        </label>

        <label className="block">
            Plate Number
            <input
                type="text"
                value={plate}
                onChange={e => onPlateChange(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg"
                placeholder="E.g. SGX1234A"
            />
        </label>

        <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-400 hover:bg-red-800 text-white py-2 rounded-lg transition-colors disabled:opacity-50">
            {loading ? 'Booking…' : 'Confirm Booking'}
        </button>
    </form>
);