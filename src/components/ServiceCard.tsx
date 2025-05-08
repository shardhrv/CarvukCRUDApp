import React from 'react';
import type { Service } from '../util/types';

interface ServiceCardProps {
    service: Service;
    onBook?: (service: Service) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
    const formattedPrice = new Intl.NumberFormat('en-SG', {
        style: 'currency',
        currency: 'SGD',
    }).format(service.price);

    return (
        <div className="bg-offwhite border border-beige rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
                <span className="inline-block bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    {service.type}
                </span>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">
                    {service.name}
                </h3>
                {service.description && (
                    <p className="mt-1 text-gray-700">
                        {service.description}
                    </p>
                )}
                <p className="mt-2 text-gray-600">
                    {service.address}
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-red-800">
                    {formattedPrice}
                </span>
                <button
                    type="button" 
                    onClick={() => onBook?.(service)}
                    className="bg-red-400 hover:bg-red-800 text-white text-base 
                    font-semibold py-2 px-4 rounded-lg shadow-sm transition-colors duration-200 ">
                    Book
                </button>
            </div>
        </div>
    );
};