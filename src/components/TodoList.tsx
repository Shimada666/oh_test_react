import { useState, KeyboardEvent, useRef, useEffect } from 'react'
import { useTodoStore, Todo } from '../store/useTodoStore'

export function TodoList() {
  const { todos, addTodo, toggleTodo, removeTodo, editTodo, clearCompleted } = useTodoStore()
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState('')
  const editInputRef = useRef<HTMLInputElement>(null)

  // Focus the edit input when editing starts
  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus()
    }
  }, [editingId])

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  const handleEditKeyDown = (e: KeyboardEvent<HTMLInputElement>, todo: Todo) => {
    if (e.key === 'Enter') {
      handleSaveEdit(todo.id)
    } else if (e.key === 'Escape') {
      setEditingId(null)
    }
  }

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const handleSaveEdit = (id: string) => {
    if (editText.trim()) {
      editTodo(id, editText.trim())
    }
    setEditingId(null)
  }

  const getCompletedCount = () => {
    return todos.filter(todo => todo.completed).length
  }

  return (
    <div className="w-full max-w-md mx-auto pixel-art">
      <div className="mb-6 flex">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="w-2/3 px-4 py-2 border-2 border-black bg-white text-black pixel-input"
          data-testid="new-todo-input"
        />
        <button
          onClick={handleAddTodo}
          className="ml-2 px-4 py-2 bg-green-500 text-white pixel-button"
          data-testid="add-todo-button"
        >
          Add
        </button>
      </div>

      {todos.length > 0 ? (
        <>
          <ul className="pixel-list">
            {todos.map((todo) => (
              <li key={todo.id} className="py-2 flex items-center group pixel-item" role="listitem">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="h-5 w-5 border-2 border-black pixel-checkbox"
                  data-testid={`todo-checkbox-${todo.id}`}
                />
                
                {editingId === todo.id ? (
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => handleEditKeyDown(e, todo)}
                    onBlur={() => handleSaveEdit(todo.id)}
                    className="ml-3 flex-grow px-2 py-1 border-2 border-black bg-white text-black pixel-input"
                    data-testid={`edit-todo-input-${todo.id}`}
                  />
                ) : (
                  <span
                    className={`ml-3 flex-grow pixel-text ${
                      todo.completed ? 'line-through text-gray-500' : 'text-black'
                    }`}
                    onDoubleClick={() => handleStartEdit(todo)}
                    data-testid={`todo-text-${todo.id}`}
                  >
                    {todo.text}
{todo.completed && (
  <span className="ml-2 text-xs pixel-text">
    (Completed: {new Date(todo.completedAt).toLocaleTimeString()})
  </span>
)}
                  </span>
                )}
                
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 pixel-button"
                  aria-label="Delete todo"
                  data-testid={`delete-todo-${todo.id}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 pixel-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex justify-between text-sm text-black pixel-footer">
            <span data-testid="todos-count">
              {todos.length} item{todos.length !== 1 ? 's' : ''} 
              {getCompletedCount() > 0 && ` (${getCompletedCount()} completed)`}
            </span>
            
            {getCompletedCount() > 0 && (
              <button
                onClick={clearCompleted}
                className="text-green-500 pixel-button"
                data-testid="clear-completed-button"
              >
                Clear completed
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-black py-6 pixel-text">
          No todos yet. Add one above!
        </p>
      )}
    </div>
  )
}
