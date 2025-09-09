import React from 'react';
import { Briefcase } from 'lucide-react';

const EmptyState = ({ onResetFilters }) => {
    return (
        <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
            <button
                onClick={onResetFilters}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
                Clear all filters
            </button>
        </div>
    );
};

export default EmptyState;
