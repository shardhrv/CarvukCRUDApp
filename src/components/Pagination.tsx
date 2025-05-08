import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPrev,
    onNext,
}) => (
    <div className="mt-8 flex justify-center items-center space-x-4">
        <button
            onClick={onPrev}
            disabled={currentPage === 0}
            className="px-4 py-2 bg-red-400 hover:bg-red-800 text-white rounded-lg disabled:opacity-50 transition-colors">
            Previous
        </button>

        <span className="text-gray-700">
            Page {currentPage + 1} of {totalPages}
        </span>

        <button
            onClick={onNext}
            disabled={currentPage >= totalPages - 1}
            className="px-4 py-2 bg-red-400 hover:bg-red-800 text-white rounded-lg disabled:opacity-50 transition-colors">
            Next
        </button>
    </div>
);
  