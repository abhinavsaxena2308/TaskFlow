import TaskCard from './TaskCard';

export default function TaskList({ tasks, onUpdateStatus, onDelete, updatingTaskIds, deletingTaskIds }) {
    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCard 
                    key={task.id} 
                    task={task} 
                    onUpdateStatus={onUpdateStatus} 
                    onDelete={onDelete}
                    isUpdating={updatingTaskIds?.has(task.id)}
                    isDeleting={deletingTaskIds?.has(task.id)}
                />
            ))}
        </div>
    );
}