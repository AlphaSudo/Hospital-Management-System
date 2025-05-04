import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import { Task, priorities } from '../../types/task'; // Import Task type and priorities

// Define the shape of the form data, excluding the 'id'
type TaskFormData = Omit<Task, 'id'>;

interface TaskFormProps {
    initialData?: Task | null; // Task data for editing, null for adding
    onSubmit: (formData: TaskFormData) => void;
    onCancel: () => void;
    formatDateForInput: (dateString: string | Date) => string; // Receive formatter
}

const defaultFormState: TaskFormData = {
    title: '',
    assignee: '',
    priority: 'Normal',
    date: '', // Store date as YYYY-MM-DD for input
    details: '',
    completed: false,
};

export const TaskForm: React.FC<TaskFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    formatDateForInput
}) => {
    const [form, setForm] = useState<TaskFormData>(defaultFormState);
    const isEditing = !!initialData;

    useEffect(() => {
        if (initialData) {
            // Pre-populate form for editing, formatting the date correctly
            setForm({
                ...initialData,
                date: formatDateForInput(initialData.date), // Format date for input
            });
        } else {
            // Reset form for adding
            setForm(defaultFormState);
        }
    }, [initialData, formatDateForInput]); // Rerun effect if initialData or formatter changes

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox' && 'checked' in e.target) {
            setForm(prev => ({
                ...prev,
                [name]: (e.target as HTMLInputElement).checked
            }));
        } else {
            setForm(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(form); // Pass the current form state (date is YYYY-MM-DD)
    };

    return (
        <div className={`flex-1 bg-gradient-to-br from-[#2c1e5c] via-[#1f1a48] to-[#1a1440] rounded-xl p-6 min-w-[320px] shadow-lg`}>
            <div className="text-white text-lg font-semibold mb-4">
                {isEditing ? 'Edit Task' : 'New Task'}
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="mb-4">
                    <input
                        className="w-full p-3 rounded-lg border border-[#363b4a] bg-[#181c24] text-white focus:outline-none"
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleFormChange}
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="text-gray-400 text-sm flex items-center">
                        <input
                            type="checkbox"
                            name="completed"
                            checked={form.completed}
                            onChange={handleFormChange}
                            className="mr-2 form-checkbox h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                        /> Mark as complete
                    </label>
                </div>
                <div className="mb-4">
                    <input
                        className="w-full p-3 rounded-lg border border-[#363b4a] bg-[#181c24] text-white focus:outline-none"
                        type="text"
                        name="assignee"
                        placeholder="Assignee image URL (optional)"
                        value={form.assignee}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="flex gap-4 mb-4">
                    <select
                        className="flex-1 p-3 rounded-lg border border-[#363b4a] bg-[#181c24] text-white focus:outline-none"
                        name="priority"
                        value={form.priority}
                        onChange={handleFormChange}
                    >
                        {priorities.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <input
                        className="flex-1 p-3 rounded-lg border border-[#363b4a] bg-[#181c24] text-white focus:outline-none"
                        type="date" // Keep as date type for input
                        name="date"
                        value={form.date} // Bind to YYYY-MM-DD formatted date
                        onChange={handleFormChange}
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        className="w-full p-3 rounded-lg border border-[#363b4a] bg-[#181c24] text-white focus:outline-none min-h-[60px]"
                        name="details"
                        placeholder="Task Details"
                        value={form.details}
                        onChange={handleFormChange}
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-3 font-semibold flex items-center justify-center gap-2">
                    {isEditing ? <FaEdit /> : <FaCheckCircle />}
                    {isEditing ? 'Update Task' : 'Add Task'}
                </button>
            </form>
            <button onClick={onCancel} className="mt-4 w-full bg-[#23273c] text-gray-400 border border-[#363b4a] rounded-md py-2 font-medium hover:bg-[#2c1e5c] transition">
                Cancel
            </button>
        </div>
    );
};
