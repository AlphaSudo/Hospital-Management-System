import React from 'react';

// Define filter types (or import from types/task.ts if defined there)
const FILTER_ALL = 'all' as const;
const FILTER_DONE = 'done' as const;
const FILTER_UNDONE = 'undone' as const;
type FilterType = typeof FILTER_ALL | typeof FILTER_DONE | typeof FILTER_UNDONE;


interface TaskFilterControlsProps {
    currentFilter: FilterType;
    onFilterChange: (filter: FilterType) => void;
}

export const TaskFilterControls: React.FC<TaskFilterControlsProps> = ({
    currentFilter,
    onFilterChange,
}) => {
    return (
        <div className="flex gap-2 mb-4">
            <button
                onClick={() => onFilterChange(FILTER_ALL)}
                className={`px-3 py-1 rounded text-sm ${currentFilter === FILTER_ALL ? 'bg-blue-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
            >
                All
            </button>
            <button
                onClick={() => onFilterChange(FILTER_DONE)}
                className={`px-3 py-1 rounded text-sm ${currentFilter === FILTER_DONE ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
            >
                Done
            </button>
            <button
                onClick={() => onFilterChange(FILTER_UNDONE)}
                className={`px-3 py-1 rounded text-sm ${currentFilter === FILTER_UNDONE ? 'bg-yellow-500 text-white' : 'bg-gray-600 text-gray-300 hover:bg-gray-500'}`}
            >
                Undone
            </button>
        </div>
    );
};
