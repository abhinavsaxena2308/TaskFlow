import { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import TaskList from '../components/tasks/TaskList';
import AddTask from '../components/tasks/AddTask';
import Modal from '../components/ui/Modal';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

export default function Dashboard() {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ongoing');

    const fetchTasks = async () => {
        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('user_id', user.id);

        if (error) {
            console.error('Error fetching tasks:', error);
        } else {
            setTasks(data);
        }
    };

    useEffect(() => {
        if (user) {
            fetchTasks();
        }
    }, [user]);

    const handleAddTask = async (task, subTasks) => {
        const { data: taskData, error: taskError } = await supabase
            .from('tasks')
            .insert([{ ...task, user_id: user.id }])
            .select();

        if (taskError) {
            console.error('Error adding task:', taskError);
            return;
        }

        if (taskData) {
            const newTaskId = taskData[0].id;
            const subTaskInserts = subTasks.map(title => ({ task_id: newTaskId, title }));

            const { error: subTaskError } = await supabase
                .from('sub_tasks')
                .insert(subTaskInserts);

            if (subTaskError) {
                console.error('Error adding sub-tasks:', subTaskError);
                // Optional: attempt to delete the parent task if sub-tasks fail
                await supabase.from('tasks').delete().eq('id', newTaskId);
            } else {
                fetchTasks(); // Refetch all tasks to get the new one with its sub-tasks
                setIsModalOpen(false);
            }
        }
    };

    const handleUpdateTaskStatus = async (id, status) => {
        const { error } = await supabase
            .from('tasks')
            .update({ status })
            .eq('id', id);

        if (error) {
            console.error('Error updating task:', error);
        } else {
            fetchTasks(); // Refetch tasks to update the UI
        }
    };

    const handleDeleteTask = async (id) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting task:', error);
        } else {
            setTasks(tasks.filter((task) => task.id !== id));
        }
    };

    const ongoingTasks = tasks.filter(task => task.status === 'ongoing' || task.status === 'upcoming');
    const completedTasks = tasks.filter(task => task.status === 'completed');

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
                <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700">Add Task</button>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('ongoing')} className={`${activeTab === 'ongoing' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                        Ongoing
                    </button>
                    <button onClick={() => setActiveTab('completed')} className={`${activeTab === 'completed' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
                        Completed
                    </button>
                </nav>
            </div>

            <div className="mt-8">
                {activeTab === 'ongoing' && (
                    <div>
                        {ongoingTasks.length > 0 ? (
                            <TaskList tasks={ongoingTasks} onUpdateStatus={handleUpdateTaskStatus} onDelete={handleDeleteTask} />
                        ) : (
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No ongoing tasks</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by adding a new task.</p>
                                <div className="mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                    >
                                        <PlusCircleIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                        New Task
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'completed' && (
                    <TaskList tasks={completedTasks} onUpdateStatus={handleUpdateTaskStatus} onDelete={handleDeleteTask} />
                )}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add a new task">
                <AddTask onAddTask={handleAddTask} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </Layout>
    );
}
