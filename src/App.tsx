import { TodoList } from './components/TodoList'
import { useTodoStore } from './store/useTodoStore'

function App() {
  const todos = useTodoStore((state) => state.todos)
  return (
    <div className="min-h-screen bg-[url('./assets/pixel-background.png')] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
  <h1 className="text-3xl font-bold pixel-heading mb-2">Todo List</h1>
  <p className="pixel-text">Total Items: {todos.length}</p>
</div>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden p-6 w-full flex flex-col gap-4">
          <TodoList />
        </div>
      </div>
    </div>
  )
}

export default App
