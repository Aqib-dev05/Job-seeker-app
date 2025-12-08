import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorState = ({ error, onRetry }) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
                <h3 className="text-red-800 font-medium">Error loading opportunities</h3>
                <p className="text-red-600 text-sm mt-1">{error}</p>
                <button
                    onClick={onRetry}
                    className="mt-3 text-red-600 hover:text-red-700 text-sm font-medium underline"
                >
                    Try again
                </button>
            </div>
        </div>
    );
};

export default ErrorState;
