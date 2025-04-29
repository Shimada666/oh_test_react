import { describe, it, expect, beforeEach } from 'vitest'
import { useCounterStore } from '../store/useCounterStore'

describe('useCounterStore', () => {
  beforeEach(() => {
    // Reset the store before each test
    useCounterStore.setState({ count: 0 })
  })

  it('should initialize with count = 0', () => {
    const { count } = useCounterStore.getState()
    expect(count).toBe(0)
  })

  it('should increment the count', () => {
    const { increment } = useCounterStore.getState()
    increment()
    const { count } = useCounterStore.getState()
    expect(count).toBe(1)
  })

  it('should decrement the count', () => {
    // First set count to 5
    useCounterStore.setState({ count: 5 })
    
    const { decrement } = useCounterStore.getState()
    decrement()
    const { count } = useCounterStore.getState()
    expect(count).toBe(4)
  })

  it('should reset the count to 0', () => {
    // First set count to 5
    useCounterStore.setState({ count: 5 })
    
    const { reset } = useCounterStore.getState()
    reset()
    const { count } = useCounterStore.getState()
    expect(count).toBe(0)
  })
})