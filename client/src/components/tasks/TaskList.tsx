import React , { useMemo } from 'react';
import { FaTrash, FaArrowUp, FaArrowDown, FaEdit } from 'react-icons/fa';
import { Task } from '../../types/task';

interface TaskListProps {
    tasks: Task[];
    onCheck: (id: number) => void;
    onDelete: (id: number) => void;
    onMove: (index: number, direction: 'up' | 'down') => void;
    onEditClick: (task: Task) => void;
    getOriginalIndex: (taskId: number) => number; // Function to get original index for moving
}

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onCheck,
    onDelete,
    onMove,
    onEditClick,
    getOriginalIndex
}) => {
    // Memoize the mapping from task ID to its original index
    const originalIndexMap = useMemo(() => {
        const map = new Map<number, number>();
        // Assuming getOriginalIndex is stable and correct based on the full task list context
        tasks.forEach(task => {
            map.set(task.id, getOriginalIndex(task.id));
        });
        return map;
    }, [tasks, getOriginalIndex]); // Recalculate if tasks or the function changes

    return (
        <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
            <table className="w-full table-auto border-separate border-spacing-0">
                <thead>
                    <tr className="text-gray-400 text-xs uppercase bg-[#1f1a48]">
                        <th className="p-2 sticky top-0 bg-[#1f1a48]"></th> {/* Checkbox */}
                        <th className="p-2 text-left sticky top-0 bg-[#1f1a48]">Task</th>
                        <th className="p-2 sticky top-0 bg-[#1f1a48]">Priority</th>
                        <th className="p-2 sticky top-0 bg-[#1f1a48]">Assignee</th>
                        <th className="p-2 sticky top-0 bg-[#1f1a48]">Due Date</th>
                        <th className="p-2 sticky top-0 bg-[#1f1a48]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                         // Find the original index in the main tasks array for moving
                         const originalIndex = originalIndexMap.get(task.id) ?? -1; // Use ?? -1 as a fallback if needed
                       
                         // Disable move buttons if index wasn't found (shouldn't happen ideally)
                        const isMoveUpDisabled = originalIndex === -1 || originalIndex === 0;
                        // Note: Comparing originalIndex to tasks.length might be incorrect if 'tasks' is filtered/sorted.
                        // The logic for disabling 'down' might need the total count from the parent.
                        // For simplicity, let's assume getOriginalIndex provides indices relative to the *original* list.
                        // A better approach might be for the parent to provide the total original count.
                        const isMoveDownDisabled = originalIndex === -1 /* || originalIndex >= totalOriginalTasks - 1 */;

                
                        return (
                            <tr key={task.id} className={`${task.completed ? 'bg-white/5 line-through text-gray-400' : 'text-white'} hover:bg-white/10`}>
                                <td className="p-2 border-b border-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => onCheck(task.id)}
                                        className="form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                                    />
                                </td>
                                <td className="p-2 min-w-[180px] border-b border-gray-700 cursor-pointer hover:text-blue-400" onClick={() => onEditClick(task)}>
                                    {task.title}
                                </td>
                                <td className="p-2 border-b border-gray-700">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                        task.priority === 'High' ? 'bg-red-500 text-white' :
                                        task.priority === 'Normal' ? 'bg-yellow-500 text-white' :
                                        'bg-cyan-400 text-white'
                                    }`}>{task.priority}</span>
                                </td>
                                <td className="p-2 border-b border-gray-700">
                                    <img src={task.assignee} alt="assignee" className="w-7 h-7 rounded-full border-2 border-[#2c1e5c]" />
                                </td>
                                <td className="p-2 border-b border-gray-700">{task.date}</td>
                                <td className="p-2 border-b border-gray-700">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => onEditClick(task)}
                                            className="text-gray-400 hover:text-yellow-400"
                                            title="Edit Task"
                                        >
                                            <FaEdit />
                                        </button>
                                       <button
                                            onClick={() => onMove(originalIndex, 'up')}
                                            disabled={isMoveUpDisabled} // Use calculated disabled state
                                            className="text-gray-400 hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Move Up"
                                        >
                                            <FaArrowUp />
                                        </button>
                                        <button
                                            onClick={() => onMove(originalIndex, 'down')}
                                            // Consider passing total task count if needed for accurate disabling
                                            disabled={isMoveDownDisabled} // Use calculated disabled state
                                            className="text-gray-400 hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                            title="Move Down"
                                        >
                                            <FaArrowDown />
                                        </button>
                                        <button
                                            onClick={() => onDelete(task.id)}
                                            className="text-gray-400 hover:text-red-500"
                                            title="Delete Task"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
