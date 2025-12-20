import { useState, useCallback } from 'react';
import { Transition } from '@headlessui/react';
import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ToastContext from './ToastContext';

const toastTypes = {
  success: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    text: 'text-green-800 dark:text-green-200',
    icon: CheckCircleIcon,
    iconColor: 'text-green-400',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-900/20',
    border: 'border-red-200 dark:border-red-800',
    text: 'text-red-800 dark:text-red-200',
    icon: XCircleIcon,
    iconColor: 'text-red-400',
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-800',
    text: 'text-yellow-800 dark:text-yellow-200',
    icon: ExclamationCircleIcon,
    iconColor: 'text-yellow-400',
  },
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    text: 'text-blue-800 dark:text-blue-200',
    icon: InformationCircleIcon,
    iconColor: 'text-blue-400',
  },
};

function Toast({ toast, onRemove }) {
  const { type, title, message, id } = toast;
  const Icon = toastTypes[type].icon;

  return (
    <Transition
      appear
      show={true}
      as="div"
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={`pointer-events-auto overflow-hidden rounded-lg ${toastTypes[type].bg} ${toastTypes[type].border} border shadow-lg w-fit min-w-[250px] max-w-sm`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Icon className={`h-6 w-6 ${toastTypes[type].iconColor}`} aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 text-left">
              <p className={`text-sm font-medium ${toastTypes[type].text}`}>{title}</p>
              {message && <p className={`mt-1 text-sm ${toastTypes[type].text} opacity-90`}>{message}</p>}
            </div>
            <div className="ml-4 flex flex-shrink-0">
              <button
                type="button"
                className={`inline-flex rounded-md ${toastTypes[type].bg} hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600 dark:focus:ring-offset-green-900`}
                onClick={() => onRemove(id)}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((type, title, message) => {
    const id = Date.now();
    const newToast = { id, type, title, message };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove after 2 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const value = {
    success: (title, message) => addToast('success', title, message),
    error: (title, message) => addToast('error', title, message),
    warning: (title, message) => addToast('warning', title, message),
    info: (title, message) => addToast('info', title, message),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div aria-live="assertive" className="pointer-events-none fixed inset-0 flex items-end justify-end px-4 py-6 sm:items-end sm:p-6 z-50">
        <div className="flex flex-col items-end space-y-4">
          {toasts.map((toast) => (
            <Toast key={toast.id} toast={toast} onRemove={removeToast} />
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
