import React from 'react';
import { MapPin, Briefcase, Filter, X } from 'lucide-react';
import FilterDropdown from './FilterDropdown';
import { locationOptions, typeOptions, fieldOptions } from '../constants/filterOptions';

const DesktopFilters = ({ 
    filters, 
    onFilterChange, 
    activeFiltersCount, 
    onResetFilters 
}) => {
    return (
        <div className="hidden md:flex items-center space-x-4">
            <FilterDropdown
                label="Location"
                value={filters.location}
                onChange={(value) => onFilterChange('location', value)}
                options={locationOptions}
                icon={MapPin}
            />
            <FilterDropdown
                label="Type"
                value={filters.type}
                onChange={(value) => onFilterChange('type', value)}
                options={typeOptions}
                icon={Briefcase}
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
                    className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center space-x-1"
                    aria-label="Clear all filters"
                >
                    <X className="w-4 h-4" />
                    <span>Clear filters ({activeFiltersCount})</span>
                </button>
            )}
        </div>
    );
};

export default DesktopFilters;
