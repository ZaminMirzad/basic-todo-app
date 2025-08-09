'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, ChevronDown } from 'lucide-react';
interface TodoFormData {
  title: string;
  category: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}
import { CATEGORIES, PRIORITIES } from '@/lib/constants';

interface AddTodoProps {
  onAdd: (data: TodoFormData) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState<Omit<TodoFormData, 'completed'>>({
    title: '',
    category: 'Personal',
    dueDate: new Date().toISOString().split('T')[0],
    priority: 'medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd({
        title: formData.title,
        category: formData.category,
        dueDate: formData.dueDate,
        priority: formData.priority,
        completed: false,
      });
      setFormData({
        title: '',
        category: 'Personal',
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
      });
      setIsExpanded(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-3 mb-3"
    >
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full flex items-center justify-center gap-2 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-medium">Add New Task</span>
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">New Task</h3>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="What needs to be done?"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => {
                  const priority = e.target.value as 'low' | 'medium' | 'high';
                  setFormData({ ...formData, priority });
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PRIORITIES.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.icon} {priority.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!formData.title.trim()}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-1.5 px-3 rounded-md font-medium hover:from-blue-600 hover:to-purple-600 transition-all text-sm"
          >
            Add Task
          </button>
        </form>
      )}
    </motion.div>
  );
}
