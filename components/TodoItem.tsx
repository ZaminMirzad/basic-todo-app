'use client';

import { motion } from 'framer-motion';
import { Check, Circle, Trash2, Calendar, Tag } from 'lucide-react';
import { Todo } from '@/lib/types';
import { CATEGORY_COLORS, PRIORITY_COLORS } from '@/lib/constants';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else if (date < today) {
      return 'Overdue';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const isOverdue = new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.3 }}
      className={`
        bg-white dark:bg-slate-800 rounded-lg shadow-sm p-3 mb-2
        border border-gray-100 dark:border-slate-700
        hover:shadow-md transition-all duration-200
        ${isOverdue && !todo.completed ? 'border-red-200 dark:border-red-800' : ''}
      `}
    >
      <div className="flex items-start gap-2">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className="flex-shrink-0 mt-1 transition-transform active:scale-95"
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Check className="w-3 h-3 text-white" />
            </motion.div>
          ) : (
            <Circle 
              className={`w-5 h-5 transition-colors ${
                isOverdue 
                  ? 'text-red-500' 
                  : 'text-gray-300 dark:text-gray-600 hover:text-blue-500'
              }`} 
            />
          )}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className={`
            text-sm font-medium leading-tight
            ${todo.completed 
              ? 'line-through text-gray-400 dark:text-gray-500' 
              : 'text-gray-900 dark:text-white'
            }
          `}>
            {todo.title}
          </h3>

          <div className="flex items-center gap-2 mt-0.5">
            {/* Category */}
            <span className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${CATEGORY_COLORS[todo.category.toLowerCase()] || CATEGORY_COLORS.personal}
            `}>
              <Tag className="w-3 h-3 mr-1" />
              {todo.category}
            </span>

            {/* Priority */}
            <span className={`
              inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
              ${PRIORITY_COLORS[todo.priority]}
            `}>
              {todo.priority}
            </span>

            {/* Due Date */}
            <div className={`
              flex items-center text-[10px] text-gray-500 dark:text-gray-400
              ${isOverdue && !todo.completed 
                ? 'text-red-600 dark:text-red-400 font-medium' 
                : ''
              }
            `}>
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(todo.dueDate)}
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(todo.id)}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors active:scale-95"
          aria-label="Delete task"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
