import { useQuery } from '@tanstack/react-query';
import { fetchBookingsPage, type BookingsResponse } from '../util/api';

export function usePaginatedBookings(userId: string | undefined, page: number) {
    return useQuery<BookingsResponse, Error>({
        queryKey: ['bookingsPage', userId, page],
        queryFn: () => fetchBookingsPage(userId!, page),
        enabled: !!userId
    });
}