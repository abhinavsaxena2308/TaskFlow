import { DocumentPlusIcon } from '@heroicons/react/24/outline';

export default function EmptyState({ type, onAction }) {
    const getConfig = () => {
        switch (type) {
            case 'today':
                return {
                    title: 'No tasks for today',
                    description: 'You have no tasks scheduled for today. Add a new task to get started.',
                    icon: DocumentPlusIcon,
                    actionText: 'Add Task'
                };
            case 'ongoing':
                return {
                    title: 'No ongoing tasks',
                    description: 'You have no ongoing tasks. Add a new task to get started.',
                    icon: DocumentPlusIcon,
                    actionText: 'Add Task'
                };
            case 'completed':
                return {
                    title: 'No completed tasks',
                    description: 'You haven\'t completed any tasks yet.',
                    icon: DocumentPlusIcon,
                    actionText: ''
                };
            default:
                return {
                    title: 'No tasks found',
                    description: 'Get started by creating a new task.',
                    icon: DocumentPlusIcon,
                    actionText: 'Add Task'
                };
        }
    };

    const config = getConfig();
    const Icon = config.icon;

    return (
        <div className="text-center py-12 animate-fadeInUp">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 transition-all duration-300 ease-in-out transform hover:scale-110 animate-scaleIn">
                <Icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 transition-all duration-300" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-gray-100 transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
                {config.title}
            </h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400 transition-all duration-300 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                {config.description}
            </p>
            {config.actionText && onAction && (
                <div className="mt-8 transition-all duration-500 ease-in-out transform hover:scale-105 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                    <button
                        type="button"
                        onClick={onAction}
                        className="inline-flex items-center px-5 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-gray-800 transition-all duration-200 transform active:scale-95 hover:shadow-lg hover:shadow-emerald-500/30"
                    >
                        <DocumentPlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        {config.actionText}
                    </button>
                </div>
            )}
        </div>
    );
}