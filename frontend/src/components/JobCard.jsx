import React from 'react';
import { MapPin, Briefcase, Calendar, ExternalLink } from 'lucide-react';

const JobCard = ({ job }) => {
    const formatDeadline = (deadline) => {
        if (!deadline) return '—';
        const date = new Date(deadline);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Expired';
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Tomorrow';
        if (diffDays <= 7) return `${diffDays} days left`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Internship': return 'bg-purple-100 text-purple-800';
            case 'Full-time': return 'bg-green-100 text-green-800';
            case 'Part-time': return 'bg-blue-100 text-blue-800';
            case 'Contract': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <img
                            src={job.logo || 'https://placehold.co/96x96?text=Job'}
                            alt={`${job.company || 'Company'} logo`}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{job.title}</h3>
                            <p className="text-sm text-gray-600">{job.company}</p>
                        </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                        {job.type || 'Role'}
                    </span>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span>{job.field}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                        <span className={formatDeadline(job.deadline) === 'Expired' ? 'text-red-600' : ''}>
                            {formatDeadline(job.deadline)}
                        </span>
                    </div>
                </div>

                <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
                    aria-label={`Apply for ${job.title} at ${job.company}`}
                >
                    <span>Apply Now</span>
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>
        </div>
    );
};

export default JobCard;
