import React from 'react';
import { useAuth } from '../context/AuthContext';
import { usePaginatedBookings } from '../hooks/usePaginatedBookings';
import { BookingsListing } from '../components/forms/BookingsListing';
import { PAGE_SIZE } from '../util/api';

export const HomePage: React.FC = () => {
    const { user } = useAuth();
    const [page, setPage] = React.useState(0);

    const {
        data,
        isLoading,
        error
    } = usePaginatedBookings(user?.id, page);

    if (!user) {
        return <p className="text-center py-4">Please sign in to see your bookings.</p>;
    }
    if (isLoading) {
        return <p className="text-center py-4">Loading bookings…</p>;
    }
    if (error) {
        return (
            <p className="text-center text-red-500 py-4">
                Error: {error.message}
            </p>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4 text-center">
                Your Bookings
            </h1>

            <BookingsListing
                data={data}
                page={page}
                onPrev={() => setPage(p => Math.max(p - 1, 0))}
                onNext={() => setPage(p => Math.min(p + 1, Math.ceil((data?.total ?? 0) / PAGE_SIZE) - 1))}
            />
        </div>
    );
};
