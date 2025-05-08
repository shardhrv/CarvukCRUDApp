import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../util/supabase-client';
import type { BookingsResponse } from '../util/api';

export function useAutoCompleteBookings(
    data: BookingsResponse | undefined,
    userId: string | undefined,
    page: number
) {
  const qc = useQueryClient();

    const autoComplete = useMutation({
        mutationFn: async (bookingId: number) => {
        const { error } = await supabase
            .from('service_schedule')
            .update({ status: 'completed' })
            .eq('id', bookingId);

        if (error) throw error;
        },
        onSuccess: () => {
        qc.invalidateQueries({
            queryKey: ['bookingsPage', userId, page],
        });
        },
    });

    useEffect(() => {
        if (!data) return;

        const now = new Date().toISOString();
        data.bookings.forEach((b) => {
        if (b.status === 'scheduled' && b.booking_time < now) {
            autoComplete.mutate(b.id);
        }
        });
    }, [data, autoComplete]);

    return autoComplete;
}