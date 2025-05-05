import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: number
  completedAt?: number
}

interface TodoState {
  todos: Todo[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  editTodo: (id: string, text: string) => void
  clearCompleted: () => void
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [
  {
    id: crypto.randomUUID(),
    text: 'Learn React',
    completed: false,
    createdAt: Date.now()
  },
  {
    id: crypto.randomUUID(),
    text: 'Master Zustand',
    completed: true,
    createdAt: Date.now(),
    completedAt: Date.now()
  },
  {
    id: crypto.randomUUID(),
    text: 'Build pixel art app',
    completed: false,
    createdAt: Date.now()
  }
],
      
      addTodo: (text) => 
        set((state) => ({
          todos: [
            {
              id: crypto.randomUUID(),
              text,
              completed: false,
              createdAt: Date.now(),
            },
            ...state.todos,
          ],
        })),
      
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? Date.now() : undefined } : todo
          ),
        })),
      
      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      
      editTodo: (id, text) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        })),
      
      clearCompleted: () =>
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        })),
    }),
    {
      name: 'todo-storage',
    }
  )
)