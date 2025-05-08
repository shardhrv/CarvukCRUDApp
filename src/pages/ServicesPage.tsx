import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { Service } from '../types';
import { ServiceCard } from '../components/ServiceCard';
import { useNavigate } from 'react-router';
import { PAGE_SIZE, type ServicesResponse, fetchServicesPage } from '../util/api';
import { Pagination } from '../components/Pagination';

export const ServicesPage: React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const navigate = useNavigate();

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery<ServicesResponse, Error, ServicesResponse, [string, number]>({
        queryKey: ['services', page],
        queryFn: () => fetchServicesPage(page)
    });

    const services = data?.services ?? [];
    const total = data?.total ?? 0;
    const totalPages = Math.ceil(total / PAGE_SIZE);

    const handlePrev = () => setPage(old => Math.max(old - 1, 0));
    const handleNext = () => setPage(old => Math.min(old + 1, totalPages - 1));

    const handleBook = (svc: Service) => {
        navigate(`/book/${svc.service_id}`);
    };

    return (
        <div className="h-[calc(100vh-8rem)] bg-cream py-8 px-4">
            <h1 className="text-3xl font-bold text-red-800 mb-6 text-center">
                Our Services
            </h1>

            {isLoading && <p className="text-center text-gray-600">Loading...</p>}
            {isError && <p className="text-center text-red-600">{error?.message}</p>}

            {!isLoading && services.length === 0 && (
                <p className="text-center text-gray-600">No services available.</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <ServiceCard key={service.service_id} service={service} onBook={handleBook}/>
                ))}
            </div>

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}/>
        </div>
    );
};
