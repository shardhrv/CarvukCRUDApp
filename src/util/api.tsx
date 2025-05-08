import { supabase } from './supabase-client';
import type { Service, Booking } from './types';

export const PAGE_SIZE = 5;

export type ServicesResponse = {
    services: Service[];
    total: number;
};

export async function fetchServicesPage(page: number): Promise<ServicesResponse> {
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data: rows, error, count } = await supabase
        .from('services')
        .select('*', { count: 'exact' })
        .range(from, to);

    if (error) throw new Error(error.message);
    return {
        services: rows ?? [],
        total: count ?? 0,
    };
}

export type BookingsResponse = {
    bookings: Booking[]
    total: number
}

export async function fetchBookingsPage( userId: string, page: number ): Promise<BookingsResponse> {
    const from = page * PAGE_SIZE
    const to   = from + PAGE_SIZE - 1

    const { data, error, count } = await supabase
        .from('service_schedule')
        .select(
        `
            id,
            booking_time,
            plate,
            status,
            services:services (
                service_id,
                name,
                type,
                description,
                address,
                price
            ),
            drivers:drivers (
                driver_id,
                name,
                email,
                phone_number
            )
        `,
        { count: 'exact' }
        )
        .eq('user_id', userId)
        .order('booking_time', { ascending: true })
        .range(from, to)
        .overrideTypes<Booking[], { merge: false }>()

    if (error) throw new Error(error.message)

    return {
        bookings: data ?? [],
        total: count ?? 0,
    }
}

