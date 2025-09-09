import React from 'react';
import { Filter, X } from 'lucide-react';
import FilterDropdown from './FilterDropdown';
import { locationOptions, typeOptions, fieldOptions } from '../constants/filterOptions';

const MobileFilters = ({ 
    showMobileFilters, 
    onToggleMobileFilters, 
    filters, 
    onFilterChange, 
    activeFiltersCount, 
    onResetFilters 
}) => {
    return (
        <>
            {/* Mobile Filter Button */}
            <div className="md:hidden">
                <button
                    onClick={onToggleMobileFilters}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2"
                    aria-expanded={showMobileFilters}
                >
                    <Filter className="w-4 h-4" />
                    <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>
            </div>

            {/* Mobile Filters Panel */}
            {showMobileFilters && (
                <div className="md:hidden bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8 space-y-4">
                    <FilterDropdown
                        label="Location"
                        value={filters.location}
                        onChange={(value) => onFilterChange('location', value)}
                        options={locationOptions}
                        icon={Filter}
                    />
                    <FilterDropdown
                        label="Type"
                        value={filters.type}
                        onChange={(value) => onFilterChange('type', value)}
                        options={typeOptions}
                        icon={Filter}
                    />
                    <FilterDropdown
                        label="Field"
                        value={filters.field}
                        onChange={(value) => onFilterChange('field', value)}
                        options={fieldOptions}
                        icon={Filter}
                    />
                    {activeFiltersCount > 0 && (
                        <button
                            onClick={onResetFilters}
                            className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center justify-center space-x-1 py-2"
                        >
                            <X className="w-4 h-4" />
                            <span>Clear all filters</span>
                        </button>
                    )}
                </div>
            )}
        </>
    );
};

export default MobileFilters;
