'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@clerk/nextjs';
import { useInstantTodos } from '@/lib/hooks/useInstantTodos';
import TodoItem from '@/components/TodoItem';
import AddTodo from '@/components/AddTodo';
import Stats from '@/components/Stats';
import FilterBar from '@/components/FilterBar';
import { AuthButton } from '@/components/AuthButton';

export default function Home() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
  } = useInstantTodos();

  const { isSignedIn } = useAuth();
  const [currentFilter, setCurrentFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Filter todos locally based on current filter
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === 'active') return !todo.completed;
    if (currentFilter === 'completed') return todo.completed;
    return true;
  });

  const handleFilterChange = (filter: 'all' | 'active' | 'completed') => {
    setCurrentFilter(filter);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-3 py-3 sm:px-4 sm:py-4">
        {/* Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-3"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
              My Tasks
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Stay organized
            </p>
          </div>
          {isSignedIn && <AuthButton />}
        </motion.div>

        {isSignedIn ? (
          <div className="space-y-2">
            {/* Stats - Mobile First */}
            <Stats stats={{
              total: filteredTodos.length,
              completed: filteredTodos.filter(t => t.completed).length,
              active: filteredTodos.filter(t => !t.completed).length,
              overdue: filteredTodos.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length,
            }} />

            {/* Filter Bar - Mobile Optimized */}
            <FilterBar 
              currentFilter={currentFilter} 
              onFilterChange={handleFilterChange} 
              stats={{
                total: filteredTodos.length,
                completed: filteredTodos.filter(t => t.completed).length,
                active: filteredTodos.filter(t => !t.completed).length,
                overdue: filteredTodos.filter(t => !t.completed && new Date(t.dueDate) < new Date()).length,
              }}
            />

            {/* Add Todo - Mobile Optimized */}
            <AddTodo onAdd={(data) => addTodo({ ...data, completed: false })} />

            {/* Todo List - Mobile Optimized */}
            <div className="space-y-2">
              <AnimatePresence>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={() => toggleTodo(todo.id)}
                    onDelete={() => deleteTodo(todo.id)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State - Mobile Optimized */}
            {filteredTodos.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 px-4"
              >
                <div className="text-4xl mb-2">📝</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No tasks yet
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Add your first task to get started
                </p>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 px-4"
          >
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Welcome to Todo App
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Sign in to start managing your tasks and stay organized
            </p>
            <div className="flex justify-center">
              <AuthButton showSignUp={true} />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
