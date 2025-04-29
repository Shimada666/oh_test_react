import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'
import { useTodoStore } from '../store/useTodoStore'

// Mock the TodoList component to simplify App tests
vi.mock('../components/TodoList', () => ({
  TodoList: () => <div data-testid="todo-list">TodoList Component</div>
}))

describe('App', () => {
  beforeEach(() => {
    // Reset the store before each test
    const { setState } = useTodoStore
    setState({ todos: [] })
  })

  it('renders the app with the correct title', () => {
    render(<App />)
    expect(screen.getByText('Todo List')).toBeInTheDocument()
  })

  it('renders the TodoList component', () => {
    render(<App />)
    expect(screen.getByTestId('todo-list')).toBeInTheDocument()
  })
})