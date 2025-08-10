'use client'

import { useAuth } from '@clerk/nextjs'
import type { Todo } from '@/lib/types';
import { db } from '@/lib/instantdb'
import { id } from '@instantdb/react'

export function useInstantTodos() {
  const { userId } = useAuth()
  const currentUserId = userId || ''

  // Real-time query for user's todos
  const { data, isLoading, error } = db.useQuery(
    currentUserId ? { todos: { $: { where: { userId: currentUserId } } } } : { todos: {} }
  )

  // CRUD operations with InstantDB
  const addTodo = (todoData: Omit<Todo, 'id' | 'createdAt' | 'userId'>) => {
    db.transact(
      db.tx.todos[id()].update({
        title: todoData.title,
        category: todoData.category,
        dueDate: todoData.dueDate,
        priority: todoData.priority,
        completed: todoData.completed || false,
        userId: currentUserId,
        createdAt: Date.now(),
      })
    )
  }

  const toggleTodo = (id: string) => {
    const todo = data?.todos?.find((t) => t.id === id)
    if (todo) {
      db.transact(
        db.tx.todos[id].update({ completed: !todo.completed })
      )
    }
  }

  const deleteTodo = (id: string) => {
    db.transact(db.tx.todos[id].delete())
  }

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const instantUpdates = { ...updates };
    // TypeScript will handle the conversion since InstantDB schema matches
    db.transact(
      db.tx.todos[id].update(instantUpdates)
    )
  }

  const todos = (data?.todos || []).map(todo => ({
    ...todo,
    priority: todo.priority as 'low' | 'medium' | 'high',
  }))

  return {
    todos,
    isLoading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
  }
}
