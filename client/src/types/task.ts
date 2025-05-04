export interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: 'High' | 'Normal' | 'Low';
  date: string; // Store date as string (e.g., "May 04, 2025" or "YYYY-MM-DD")
  details: string;
  completed: boolean;
}

export const priorities: Task['priority'][] = ['High', 'Normal', 'Low'];
