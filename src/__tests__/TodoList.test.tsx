import { render, screen, fireEvent } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TodoList } from '../components/TodoList'
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

describe('TodoList', () => {
  beforeEach(() => {
    // Reset the store before each test
    useTodoStore.setState({ todos: [] })
    idIndex = 0
  })

  it('renders empty state correctly', () => {
    render(<TodoList />)
    
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument()
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
  })

  it('adds a new todo', () => {
    render(<TodoList />)
    
    const input = screen.getByTestId('new-todo-input')
    const addButton = screen.getByTestId('add-todo-button')
    
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.click(addButton)
    
    expect(screen.getByTestId(`todo-text-${mockIds[0]}`)).toHaveTextContent('Test todo')
    expect(screen.getByTestId('todos-count')).toHaveTextContent('1 item')
    expect(input).toHaveValue('')
  })

  it('adds a new todo with Enter key', () => {
    render(<TodoList />)
    
    const input = screen.getByTestId('new-todo-input')
    
    fireEvent.change(input, { target: { value: 'Test todo' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(screen.getByTestId(`todo-text-${mockIds[0]}`)).toHaveTextContent('Test todo')
  })

  it('toggles a todo', () => {
    const { addTodo } = useTodoStore.getState()
    addTodo('Test todo')
    
    render(<TodoList />)
    
    const checkbox = screen.getByTestId(`todo-checkbox-${mockIds[0]}`)
    
    expect(checkbox).not.toBeChecked()
    
    fireEvent.click(checkbox)
    
    expect(checkbox).toBeChecked()
    expect(screen.getByTestId(`todo-text-${mockIds[0]}`)).toHaveClass('line-through')
    expect(screen.getByTestId('todos-count')).toHaveTextContent('1 item (1 completed)')
    expect(screen.getByTestId('clear-completed-button')).toBeInTheDocument()
  })

  it('removes a todo', () => {
    const { addTodo } = useTodoStore.getState()
    addTodo('Test todo')
    
    render(<TodoList />)
    
    fireEvent.click(screen.getByTestId(`delete-todo-${mockIds[0]}`))
    
    expect(screen.queryByTestId(`todo-text-${mockIds[0]}`)).not.toBeInTheDocument()
    expect(screen.getByText('No todos yet. Add one above!')).toBeInTheDocument()
  })

  it('edits a todo', () => {
    const { addTodo } = useTodoStore.getState()
    addTodo('Test todo')
    
    render(<TodoList />)
    
    // Double click to start editing
    fireEvent.doubleClick(screen.getByTestId(`todo-text-${mockIds[0]}`))
    
    const editInput = screen.getByTestId(`edit-todo-input-${mockIds[0]}`)
    expect(editInput).toHaveValue('Test todo')
    
    fireEvent.change(editInput, { target: { value: 'Updated todo' } })
    fireEvent.keyDown(editInput, { key: 'Enter' })
    
    expect(screen.getByTestId(`todo-text-${mockIds[0]}`)).toHaveTextContent('Updated todo')
  })

  it('clears completed todos', () => {
    const { addTodo } = useTodoStore.getState()
    
    // Add two todos and complete one
    addTodo('Todo 1')
    addTodo('Todo 2')
    
    render(<TodoList />)
    
    // Add role to li elements for testing
    const todoItems = screen.getAllByTestId(/^todo-text-/);
    expect(todoItems).toHaveLength(2)
    
    // Toggle the first todo
    fireEvent.click(screen.getByTestId(`todo-checkbox-${mockIds[0]}`))
    
    // Click clear completed button
    fireEvent.click(screen.getByTestId('clear-completed-button'))
    
    // Check that only one todo remains
    const remainingItems = screen.getAllByTestId(/^todo-text-/);
    expect(remainingItems).toHaveLength(1)
    expect(screen.getByTestId('todos-count')).toHaveTextContent('1 item')
    expect(screen.queryByTestId('clear-completed-button')).not.toBeInTheDocument()
  })
})