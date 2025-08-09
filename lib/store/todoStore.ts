import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt?: string;
}

export interface TodoFilter {
  status: 'all' | 'active' | 'completed';
  category?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface TodoState {
  todos: Todo[];
  filter: TodoFilter;
  searchQuery: string;
  isLoading: boolean;
  
  // Actions
  addTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: TodoFilter) => void;
  setSearchQuery: (query: string) => void;
  clearCompleted: () => void;
  
  // Selectors
  filteredTodos: () => Todo[];
  stats: () => { total: number; completed: number; active: number; overdue: number };
}

const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todos: [
        {
          id: '1',
          title: 'Complete Next.js project setup',
          completed: true,
          category: 'Work',
          dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          priority: 'high',
          createdAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Review design mockups for new feature',
          completed: false,
          category: 'Design',
          dueDate: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          priority: 'medium',
          createdAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Schedule team standup meeting',
          completed: false,
          category: 'Work',
          dueDate: new Date(Date.now() + 259200000).toISOString().split('T')[0],
          priority: 'high',
          createdAt: new Date().toISOString(),
        },
        {
          id: '4',
          title: 'Update project documentation',
          completed: true,
          category: 'Work',
          dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
          priority: 'low',
          createdAt: new Date().toISOString(),
        },
        {
          id: '5',
          title: 'Evening gym session - legs day',
          completed: false,
          category: 'Personal',
          dueDate: new Date().toISOString().split('T')[0],
          priority: 'medium',
          createdAt: new Date().toISOString(),
        },
        {
          id: '6',
          title: 'Grocery shopping for the week',
          completed: true,
          category: 'Personal',
          dueDate: new Date().toISOString().split('T')[0],
          priority: 'medium',
          createdAt: new Date().toISOString(),
        }
      ],
      filter: { status: 'all' },
      searchQuery: '',
      isLoading: false,

      addTodo: (todoData) => {
        const newTodo: Todo = {
          ...todoData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ todos: [...state.todos, newTodo] }));
      },

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updatedAt: new Date().toISOString() }
              : todo
          ),
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      updateTodo: (id, updates) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
              : todo
          ),
        }));
      },

      setFilter: (filter) => set({ filter }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },

      filteredTodos: () => {
        const { todos, filter, searchQuery } = get();
        let filtered = todos;

        // Filter by status
        if (filter.status !== 'all') {
          filtered = filtered.filter((todo) =>
            filter.status === 'completed' ? todo.completed : !todo.completed
          );
        }

        // Filter by category
        if (filter.category) {
          filtered = filtered.filter((todo) => todo.category === filter.category);
        }

        // Filter by priority
        if (filter.priority) {
          filtered = filtered.filter((todo) => todo.priority === filter.priority);
        }

        // Filter by search query
        if (searchQuery) {
          filtered = filtered.filter((todo) =>
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            todo.category.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        return filtered.sort((a, b) => {
          // Sort by completion status
          if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
          }
          
          // Sort by priority
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          if (a.priority !== b.priority) {
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          }
          
          // Sort by due date
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
      },

      stats: () => {
        const { todos } = get();
        const now = new Date();
        return {
          total: todos.length,
          completed: todos.filter((t) => t.completed).length,
          active: todos.filter((t) => !t.completed).length,
          overdue: todos.filter(
            (t) => !t.completed && new Date(t.dueDate) < now
          ).length,
        };
      },
    }),
    {
      name: 'todo-storage',
    }
  )
);

export default useTodoStore;
