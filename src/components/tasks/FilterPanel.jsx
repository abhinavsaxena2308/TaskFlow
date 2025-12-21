import { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function FilterPanel({ 
    priorityFilters, 
    setPriorityFilters, 
    dueDateFilter, 
    setDueDateFilter, 
    statusFilters, 
    setStatusFilters,
    onClose 
}) {
    const panelRef = useRef(null);

    // Close panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (panelRef.current && !panelRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    const togglePriorityFilter = (priority) => {
        if (priorityFilters.includes(priority)) {
            setPriorityFilters(priorityFilters.filter(p => p !== priority));
        } else {
            setPriorityFilters([...priorityFilters, priority]);
        }
    };

    const toggleStatusFilter = (status) => {
        if (statusFilters.includes(status)) {
            setStatusFilters(statusFilters.filter(s => s !== status));
        } else {
            setStatusFilters([...statusFilters, status]);
        }
    };

    const handleDueDateFilterChange = (filter) => {
        setDueDateFilter(filter === dueDateFilter ? '' : filter);
    };

    const clearAllFilters = () => {
        setPriorityFilters([]);
        setDueDateFilter('');
        setStatusFilters([]);
    };

    return (
        <div 
            ref={panelRef}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700"
        >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filter Tasks</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <div className="p-4 space-y-6">
                {/* Priority Filter */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</h4>
                    <div className="space-y-2">
                        {['Low', 'Medium', 'High'].map((priority) => (
                            <div key={priority} className="flex items-center">
                                <input
                                    id={`priority-${priority}`}
                                    type="checkbox"
                                    checked={priorityFilters.includes(priority)}
                                    onChange={() => togglePriorityFilter(priority)}
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`priority-${priority}`}
                                    className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {priority}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Due Date Filter */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</h4>
                    <div className="space-y-2">
                        {['Today', 'This Week', 'Overdue'].map((filter) => (
                            <div key={filter} className="flex items-center">
                                <input
                                    id={`due-date-${filter}`}
                                    type="radio"
                                    name="due-date-filter"
                                    checked={dueDateFilter === filter}
                                    onChange={() => handleDueDateFilterChange(filter)}
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`due-date-${filter}`}
                                    className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {filter}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Status Filter */}
                <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h4>
                    <div className="space-y-2">
                        {['Upcoming', 'Ongoing', 'Completed'].map((status) => (
                            <div key={status} className="flex items-center">
                                <input
                                    id={`status-${status}`}
                                    type="checkbox"
                                    checked={statusFilters.includes(status)}
                                    onChange={() => toggleStatusFilter(status)}
                                    className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                    htmlFor={`status-${status}`}
                                    className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                                >
                                    {status}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                <button
                    onClick={clearAllFilters}
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                >
                    Clear All
                </button>
                <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
}