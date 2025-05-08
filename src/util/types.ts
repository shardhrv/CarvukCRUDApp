export interface Service {
    service_id: string;
    type: string;
    name: string;
    description?: string;
    address: string;
    price: number;
}

export interface Driver {
    driver_id: string;
    name: string;
    email: string;
    phone_number: string;
}

export interface Booking {
    id: number;
    booking_time: string;
    plate: string,
    status: 'scheduled' | 'completed' | 'cancelled';
    services: Service;
    drivers: Driver;
}