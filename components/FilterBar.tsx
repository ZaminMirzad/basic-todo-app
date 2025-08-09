'use client';

import { motion } from 'framer-motion';
import { Filter, TrendingUp, CheckCircle, Clock } from 'lucide-react';

interface FilterBarProps {
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

export default function FilterBar({ 
  currentFilter, 
  onFilterChange, 
  stats 
}: FilterBarProps) {
  const filters = [
    { id: 'all', name: 'All', icon: Filter, count: stats.total },
    { id: 'active', name: 'Active', icon: Clock, count: stats.active },
    { id: 'completed', name: 'Done', icon: CheckCircle, count: stats.completed },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-2 mb-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Filter Tasks
        </h3>
        <div className="text-[10px] text-gray-500 dark:text-gray-400">
          {stats.total} total
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1.5 mt-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <button
              key={filter.id}
              onClick={() => onFilterChange(filter.id as 'all' | 'active' | 'completed')}
              className={`
                flex flex-col items-center justify-center p-1.5 rounded-md text-xs font-medium transition-all
                ${currentFilter === filter.id
                  ? 'bg-blue-500 text-white shadow-sm'
                  : 'bg-gray-50 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-600'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5 mb-0.5" />
              <span>{filter.name}</span>
              <span className="text-[10px] opacity-75">
                {filter.count}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
