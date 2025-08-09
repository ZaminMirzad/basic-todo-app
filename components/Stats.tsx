'use client';

import { motion } from 'framer-motion';
import { TrendingUp, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface StatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    overdue: number;
  };
}

export default function Stats({ stats }: StatsProps) {
  const statCards = [
    {
      label: 'Total',
      value: stats.total,
      icon: TrendingUp,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      label: 'Active',
      value: stats.active,
      icon: Clock,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      icon: AlertCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 gap-2 mb-3"
    >
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${stat.bgColor} rounded-lg p-2 text-center`}
          >
            <Icon className={`w-4 h-4 mx-auto mb-0.5 ${stat.color}`} />
            <div className={`text-base font-semibold ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
