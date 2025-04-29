import { TodoList } from './components/TodoList'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Todo List
        </h1>
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden p-6">
          <TodoList />
        </div>
      </div>
    </div>
  )
}

export default App
