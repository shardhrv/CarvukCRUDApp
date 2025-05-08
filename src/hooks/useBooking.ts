import { useState } from 'react';
import { supabase } from '../supabase-client';

export function useBooking() {
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string|null>(null);
    const [successMsg, setSuccessMsg] = useState<string|null>(null);

    async function book(
        { userId, serviceId, date, time, }: { userId: string; serviceId: string; date: string; time: string }
    ) {
        setErrorMsg(null);
        setSuccessMsg(null);

        if (!userId) return setErrorMsg('You must be logged in.');
        if (!serviceId) return setErrorMsg('Invalid service.');
        if (!date || !time) return setErrorMsg('Select both date and time.');

        const bookingTime = new Date(`${date}T${time}`);
        if (bookingTime <= new Date()) {
            return setErrorMsg('Cannot book a past time.');
        }

        setLoading(true);

        const fromTime = bookingTime.toISOString();
        const toTime = new Date(bookingTime.getTime() + 4 * 60 * 60 * 1000).toISOString();
        
        // dind busy drivers in the window
        const { data: busyRows, error: busyError } = await supabase
            .from('service_schedule')
            .select('driver_id')
            .eq('status', 'scheduled')
            .gte('booking_time', fromTime)
            .lt('booking_time', toTime);
        
        if (busyError) {
            setErrorMsg(busyError.message);
            setLoading(false);
            return;
        }
      
        const busyIds = busyRows
            ?.map((r: { driver_id: string }) => r.driver_id)
            ?? [];


        //fnd first available driver
        let driverQuery = supabase.from('drivers').select('driver_id');

        if (busyIds.length > 0) {
            driverQuery = driverQuery.not('driver_id', 'in', `(${busyIds.join(',')})`);
        }

        const { data: availDrivers, error: driverError } = await driverQuery.limit(1);

        if (driverError) {
            setErrorMsg(driverError.message);
            setLoading(false);
            return;
        }

        if (!availDrivers || availDrivers.length === 0) {
            setErrorMsg('No drivers available at that time.');
            setLoading(false);
            return;
        }

        const driverId = availDrivers[0].driver_id;

        //insert booking
        const { error: insertError } = await supabase
            .from('service_schedule')
            .insert({
                user_id: userId,
                service_id: serviceId,
                driver_id: driverId,
                booking_time: bookingTime.toISOString(),
                status: 'scheduled',
            });
        if (insertError) {
            setErrorMsg(insertError.message);
        } else {
            setSuccessMsg('Booking confirmed!');
        }

        setLoading(false);
    }

    return {
        loading,
        errorMsg,
        successMsg,
        book,
    };
}