import { useState } from 'react';
import { PlusCircleIcon, CheckCircleIcon, CalendarDaysIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const emptyStateTypes = {
  ongoing: {
    icon: PlusCircleIcon,
    title: 'No ongoing tasks',
    description: 'Get started by adding a new task to track your progress.',
    buttonText: 'New Task',
    color: 'emerald',
  },
  completed: {
    icon: CheckCircleIcon,
    title: 'No completed tasks yet',
    description: 'Complete your ongoing tasks to see them appear here.',
    buttonText: null,
    color: 'green',
  },
  allTasks: {
    icon: ClipboardDocumentListIcon,
    title: 'No tasks yet',
    description: 'Create your first task to start organizing your work.',
    buttonText: 'Create Task',
    color: 'indigo',
  },
  upcoming: {
    icon: CalendarDaysIcon,
    title: 'No upcoming tasks',
    description: 'Tasks marked as upcoming will appear here.',
    buttonText: null,
    color: 'blue',
  },
};

export default function EmptyState({ type = 'ongoing', onAction, className = '' }) {
  const config = emptyStateTypes[type];
  const Icon = config.icon;
  const colorClasses = {
    emerald: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-900/20',
    green: 'text-green-500 bg-green-100 dark:bg-green-900/20',
    indigo: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-900/20',
    blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/20',
  };

  return (
    <div className={`text-center py-12 ${className}`}>
      <div className={`mx-auto h-24 w-24 rounded-full ${colorClasses[config.color]} flex items-center justify-center mb-6`}>
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {config.title}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-sm mx-auto">
        {config.description}
      </p>
      {config.buttonText && onAction && (
        <button
          type="button"
          onClick={onAction}
          className={`inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${config.color}-600 hover:bg-${config.color}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${config.color}-500`}
        >
          <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          {config.buttonText}
        </button>
      )}
    </div>
  );
}
