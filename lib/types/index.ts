export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

export interface TodoFormData {
  title: string;
  category: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  icon?: string;
}

export type TodoStatus = 'all' | 'active' | 'completed';
export type TodoPriority = 'low' | 'medium' | 'high';

export interface Stats {
  total: number;
  completed: number;
  active: number;
  overdue: number;
}
