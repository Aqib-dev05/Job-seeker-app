import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FilterDropdown = ({ label, value, onChange, options, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full md:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between space-x-2 hover:border-gray-400 transition-colors duration-200"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                {Icon && <Icon className="w-4 h-4 text-gray-500" />}
                <span className="text-sm text-gray-700">{value === 'all' ? label : value}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />
                    <div className="absolute z-20 mt-2 w-full md:w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                                role="option"
                                aria-selected={value === option.value}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default FilterDropdown;
