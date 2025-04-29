import { beforeEach, describe, expect, it } from 'vitest'
import { useTodoStore } from '../store/useTodoStore'

// Mock crypto.randomUUID to return predictable IDs for testing
const mockIds = ['test-id-1', 'test-id-2', 'test-id-3']
let idIndex = 0

vi.stubGlobal('crypto', {
  randomUUID: () => {
    const id = mockIds[idIndex % mockIds.length]
    idIndex++
    return id
  },
})

describe('useTodoStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useTodoStore.setState({ todos: [] })
    idIndex = 0
  })

  it('should add a new todo', () => {
    const { addTodo } = useTodoStore.getState()
    
    addTodo('Test todo')
    
    const { todos } = useTodoStore.getState()
    expect(todos).toHaveLength(1)
    expect(todos[0]).toEqual({
      id: mockIds[0],
      text: 'Test todo',
      completed: false,
      createdAt: expect.any(Number),
    })
  })

  it('should toggle a todo', () => {
    const { addTodo } = useTodoStore.getState()
    
    addTodo('Test todo')
    
    let state = useTodoStore.getState()
    expect(state.todos[0].completed).toBe(false)
    
    state.toggleTodo(mockIds[0])
    
    state = useTodoStore.getState()
    expect(state.todos[0].completed).toBe(true)
    
    state.toggleTodo(mockIds[0])
    
    state = useTodoStore.getState()
    expect(state.todos[0].completed).toBe(false)
  })

  it('should remove a todo', () => {
    const { addTodo } = useTodoStore.getState()
    
    addTodo('Test todo')
    
    let state = useTodoStore.getState()
    expect(state.todos).toHaveLength(1)
    
    state.removeTodo(mockIds[0])
    
    state = useTodoStore.getState()
    expect(state.todos).toHaveLength(0)
  })

  it('should edit a todo', () => {
    const { addTodo } = useTodoStore.getState()
    
    addTodo('Test todo')
    
    let state = useTodoStore.getState()
    expect(state.todos[0].text).toBe('Test todo')
    
    state.editTodo(mockIds[0], 'Updated todo')
    
    state = useTodoStore.getState()
    expect(state.todos[0].text).toBe('Updated todo')
  })

  it('should clear completed todos', () => {
    const { addTodo } = useTodoStore.getState()
    
    addTodo('Todo 1')
    addTodo('Todo 2')
    addTodo('Todo 3')
    
    let state = useTodoStore.getState()
    state.toggleTodo(mockIds[0]) // Toggle the first todo
    
    state = useTodoStore.getState()
    state.clearCompleted()
    
    state = useTodoStore.getState()
    expect(state.todos).toHaveLength(2)
    expect(state.todos.some(todo => todo.completed)).toBe(false)
  })
})