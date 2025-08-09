export const CATEGORIES = [
  { id: 'work', name: 'Work', color: 'blue', icon: '💼' },
  { id: 'personal', name: 'Personal', color: 'green', icon: '🏠' },
  { id: 'health', name: 'Health', color: 'red', icon: '❤️' },
  { id: 'learning', name: 'Learning', color: 'purple', icon: '📚' },
  { id: 'shopping', name: 'Shopping', color: 'orange', icon: '🛒' },
  { id: 'finance', name: 'Finance', color: 'yellow', icon: '💰' },
];

export const PRIORITIES = [
  { id: 'low', name: 'Low', color: 'gray', icon: '○' },
  { id: 'medium', name: 'Medium', color: 'yellow', icon: '◐' },
  { id: 'high', name: 'High', color: 'red', icon: '●' },
];

export const STATUS_OPTIONS = [
  { id: 'all', name: 'All', icon: '📋' },
  { id: 'active', name: 'Active', icon: '⏳' },
  { id: 'completed', name: 'Completed', icon: '✅' },
];

export const CATEGORY_COLORS: Record<string, string> = {
  work: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  personal: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  health: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  learning: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  shopping: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  finance: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
};

export const PRIORITY_COLORS: Record<string, string> = {
  low: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
};

export const SPACING = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

export const ANIMATION = {
  duration: 0.3,
  stagger: 0.05,
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
};

export const DATE_FORMATS = {
  short: 'MMM d',
  medium: 'MMM d, yyyy',
  full: 'EEEE, MMMM d, yyyy',
};
