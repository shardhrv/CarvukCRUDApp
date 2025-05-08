import React from 'react';
import type { Booking } from '../util/types';

interface Props {
    booking: Booking;
    onCancel?: (bookingId: number) => void;
}

export const BookingCard: React.FC<Props> = ({ booking, onCancel }) => {
    const { services, drivers, booking_time, status, id, plate } = booking
    const formattedPrice = new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: 'SGD',
    }).format(services.price)

    return (
        <div className="bg-offwhite border border-beige rounded-lg shadow-md p-6 flex flex-col justify-between w-80">
            <div>
                <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    {services.type}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    {services.name}
                </h3>
                    {services.description && (
                <p className="mt-1 text-gray-700">
                    {services.description}
                </p>
                )}
                <p className="mt-2 text-gray-600">
                    {services.address}
                </p>
            </div>

            <div className="mt-4 space-y-1">
                <p className="text-gray-600">
                    <strong>When:</strong> {new Date(booking_time).toLocaleString()}
                </p>
                <p className="text-gray-600">
                    <strong>Status:</strong> {status}
                </p>
                <p className="text-gray-600">
                    <strong>Plate Number:</strong> {plate}
                </p>
            </div>

            {/* Price & driver info */}
            <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-red-800">
                    {formattedPrice}
                </span>
                <div className="text-right text-sm">
                    <p className="text-gray-900">Driver:</p>
                    <p className="text-gray-900">{drivers.name}</p>
                    <p className="text-gray-600">{drivers.phone_number}</p>
                </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
                <button
                    onClick={() => onCancel?.(id)}
                    disabled={status === 'cancelled' || status === 'completed'}
                    className={`w-full text-center py-2 rounded-lg font-semibold transition-colors ${
                        status === 'cancelled'
                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : status === 'completed'
                            ? 'bg-green-300 text-green-800 cursor-not-allowed'
                        : 'bg-red-400 hover:bg-red-800 text-white'
                    }`}
                >
                    {status === 'cancelled'
                        ? 'Cancelled'
                    : status === 'completed'
                        ? 'Completed'
                    : 'Cancel Booking'}
                </button>
            </div>
        </div>
    )
}