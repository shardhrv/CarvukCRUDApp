import React from 'react';
import { BookingCard } from '../../components/BookingCard';
import { Pagination } from '../Pagination';
import { PAGE_SIZE, type BookingsResponse } from '../../util/api';

interface Props {
    data: BookingsResponse | undefined;
    page: number;
    onPrev: () => void;
    onNext: () => void;
    onCancel: (bookingId: number) => void;
}

export const BookingsListing: React.FC<Props> = ({ data, page, onPrev, onNext, onCancel }) => {
    const bookings = data?.bookings ?? [];
    const total = data?.total ?? 0;
    const pageCount = Math.ceil(total / PAGE_SIZE);

    if (bookings.length === 0) {
        return <p className="text-center text-gray-400">No bookings found.</p>;
    }

    return (
        <>
            <div className="flex flex-wrap gap-6 justify-center">
                {bookings.map(b => (
                    <BookingCard key={b.id} booking={b} onCancel={onCancel}/>
                ))}
            </div>
            <Pagination
                currentPage={page}
                totalPages={pageCount}
                onPrev={onPrev}
                onNext={onNext}
            />
        </>
    );
};