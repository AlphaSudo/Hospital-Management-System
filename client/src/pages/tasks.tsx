import React, { useState, useMemo, useCallback } from 'react';
import { Sidebar } from '../components/ui/sidebar';
import { Header } from '../components/ui/Header';
import { FaPlus } from 'react-icons/fa';
import CheckListIcon from '../assets/icons/CheckListIcon.tsx';
import { useTasks } from '../hooks/useTasks';
import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';
import { Task } from '../types/task';
import { TaskFilterControls } from '../components/tasks/TaskFilterControls'; // Import the new component

// Define or import filter constants
const FILTER_ALL = 'all' as const;
const FILTER_DONE = 'done' as const;
const FILTER_UNDONE = 'undone' as const;
type FilterType = typeof FILTER_ALL | typeof FILTER_DONE | typeof FILTER_UNDONE;


const TasksPage: React.FC = () => {
  const {
      tasks,
      handleCheck,
      handleDeleteTask,
      handleMoveTask,
      handleAddTask,
      handleUpdateTask,
      formatDateForInput,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [filter, setFilter] = useState<FilterType>(FILTER_ALL); // Use constant
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // --- Filter Tasks ---
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case FILTER_DONE: // Use constant
        return tasks.filter(task => task.completed);
      case FILTER_UNDONE: // Use constant
        return tasks.filter(task => !task.completed);
      case FILTER_ALL: // Use constant
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // --- Edit Click Handler ---
  const handleEditClick = useCallback((task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  }, []);

  // --- Form Submit Handler ---
  const handleFormSubmit = useCallback((formData: Omit<Task, 'id'>) => {
    if (editingTask) {
      handleUpdateTask(formData, editingTask.id);
    } else {
      handleAddTask(formData);
    }
    setShowForm(false);
    setEditingTask(null);
  }, [editingTask, handleAddTask, handleUpdateTask]);

  // --- Cancel Form Handler ---
  const handleCancelForm = useCallback(() => {
    setShowForm(false);
    setEditingTask(null);
  }, []);

  // --- Add Task Button Click Handler ---
   const handleAddTaskClick = useCallback(() => {
    setEditingTask(null); // Ensure we are adding, not editing
    setShowForm(true);
  }, []);

  // --- Get Original Index for Moving ---
  // This is needed because filteredTasks might have different indices
  const getOriginalIndex = useCallback((taskId: number): number => {
      return tasks.findIndex(t => t.id === taskId);
  }, [tasks]);

  // --- Delete Task Handler (adjust if deleting the edited task) ---
  const deleteTaskAndCloseForm = useCallback((id: number) => {
      handleDeleteTask(id);
      if (editingTask && editingTask.id === id) {
          handleCancelForm(); // Close form if deleting the task being edited
      }
  }, [handleDeleteTask, editingTask, handleCancelForm]);


  return (
    <div
      className={`flex h-screen bg-[#05002E] overflow-hidden ${theme === "dark" ? "" : "light-mode"}`} // Assuming theme is managed elsewhere or passed down
    >
      <Sidebar isOpen={sidebarOpen} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          title="Tasks"
          icon={<CheckListIcon className="h-8 w-8 text-[#31A8FF] bg-clip-text text-transparent" />}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          language={language}
          setLanguage={setLanguage}
        />
        <div className="p-8 flex gap-8 pt-24 overflow-y-auto">
          {/* Tasks List Section */}
          <div className="flex-2 bg-gradient-to-br from-[#2c1e5c] via-[#1f1a48] to-[#1a1440] rounded-xl p-6 min-w-0 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <div className="text-white text-xl font-semibold">Tasks</div>
              {/* Hide Add Task button when form is open */}
              {!showForm && (
                <button onClick={handleAddTaskClick} className="bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 px-4 font-medium flex items-center gap-2">
                  <FaPlus /> Add Task
                </button>
              )}
            </div>
            {/* Use TaskFilterControls Component */}
            <TaskFilterControls
                currentFilter={filter}
                onFilterChange={setFilter}
            />

             <div className="text-gray-400 text-sm mb-4">{tasks.length} Total task(s)</div>
             {/* Render TaskList Component */}
             <TaskList
                tasks={filteredTasks}
                onCheck={handleCheck}
                onDelete={deleteTaskAndCloseForm} // Use adjusted delete handler
                onMove={handleMoveTask}
                onEditClick={handleEditClick}
                getOriginalIndex={getOriginalIndex} // Pass the function to get original index
             />
          </div>

          {/* Task Form Section - Conditionally Render */}
          {showForm && (
            <TaskForm
                initialData={editingTask} // Pass task data for editing, or null for adding
                onSubmit={handleFormSubmit}
                onCancel={handleCancelForm}
                formatDateForInput={formatDateForInput} // Pass formatter
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage;