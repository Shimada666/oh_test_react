import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'
import { useCounterStore } from '../store/useCounterStore'

describe('App', () => {
  beforeEach(() => {
    // Reset the store before each test
    useCounterStore.setState({ count: 0 })
  })

  it('renders the app with initial count of 0', () => {
    render(<App />)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  it('increments the count when the increment button is clicked', () => {
    render(<App />)
    const incrementButton = screen.getByText('Increment')
    fireEvent.click(incrementButton)
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })

  it('decrements the count when the decrement button is clicked', () => {
    // First set count to 5
    useCounterStore.setState({ count: 5 })
    
    render(<App />)
    const decrementButton = screen.getByText('Decrement')
    fireEvent.click(decrementButton)
    expect(screen.getByText('Count: 4')).toBeInTheDocument()
  })

  it('resets the count when the reset button is clicked', () => {
    // First set count to 5
    useCounterStore.setState({ count: 5 })
    
    render(<App />)
    const resetButton = screen.getByText('Reset')
    fireEvent.click(resetButton)
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })
})