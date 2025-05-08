import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase-client';

export function useCancelBooking(userId: string | undefined, page: number) {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: async (bookingId: number) => {
            const { error } = await supabase
                .from('service_schedule')
                .update({ status: 'cancelled' })
                .eq('id', bookingId);

            if (error) throw error;
        },
        onSuccess: () => {
            qc.invalidateQueries({
                queryKey: ['bookingsPage', userId, page],
            });
        },
    });
}