import React, { useEffect } from 'react';
import { useJobs } from '../contexts/JobsContext';
import SearchBar from './SearchBar';
import DesktopFilters from './DesktopFilters';
import MobileFilters from './MobileFilters';
import JobCard from './JobCard';
import LoadingState from './LoadingState';
import ErrorState from './ErrorState';
import EmptyState from './EmptyState';

// Main Component with Context
const JobsInternshipsModule = () => {
    const {
        opportunities,
        loading,
        error,
        searchTerm,
        filters,
        showMobileFilters,
        activeFiltersCount,
        setSearchTerm,
        setFilter,
        resetFilters,
        toggleMobileFilters,
        loadOpportunities
    } = useJobs();

    // Load opportunities on mount and when filters change
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            loadOpportunities();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [loadOpportunities]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Jobs & Internships</h1>
                    <p className="text-gray-600">Discover opportunities that match your career goals</p>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8">
                    {/* Search Bar */}
                    <SearchBar 
                        searchTerm={searchTerm} 
                        onSearchChange={setSearchTerm} 
                    />

                    {/* Desktop Filters */}
                    <DesktopFilters
                        filters={filters}
                        onFilterChange={setFilter}
                        activeFiltersCount={activeFiltersCount}
                        onResetFilters={resetFilters}
                    />

                    {/* Mobile Filters */}
                    <MobileFilters
                        showMobileFilters={showMobileFilters}
                        onToggleMobileFilters={toggleMobileFilters}
                        filters={filters}
                        onFilterChange={setFilter}
                        activeFiltersCount={activeFiltersCount}
                        onResetFilters={resetFilters}
                    />
                </div>

                {/* Results Section */}
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-gray-600">
                        {loading ? 'Loading...' : `${opportunities.length} opportunities found`}
                    </p>
                </div>

                {/* Loading State */}
                {loading && <LoadingState />}

                {/* Error State */}
                {error && !loading && (
                    <ErrorState 
                        error={error} 
                        onRetry={loadOpportunities} 
                    />
                )}

                {/* Job Cards Grid */}
                {!loading && !error && opportunities.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {opportunities.map((job) => (
                            <JobCard key={job.id} job={job} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && opportunities.length === 0 && (
                    <EmptyState onResetFilters={resetFilters} />
                )}
            </div>
        </div>
    );
};

export default JobsInternshipsModule;