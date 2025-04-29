import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useCounterStore } from './store/useCounterStore'

function App() {
  const { count, increment, decrement, reset } = useCounterStore()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex gap-8">
        <a href="https://vite.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" className="transition-transform hover:scale-110">
          <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
        </a>
      </div>
      <h1 className="my-6 text-4xl font-bold text-gray-800 dark:text-white">Vite + React + Tailwind + Zustand</h1>
      <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="mb-4 text-center text-2xl font-bold text-gray-700 dark:text-gray-200">
          Count: {count}
        </div>
        <div className="flex gap-4">
          <button
            onClick={decrement}
            className="rounded-md bg-red-500 px-4 py-2 font-medium text-white transition-colors hover:bg-red-600"
          >
            Decrement
          </button>
          <button
            onClick={reset}
            className="rounded-md bg-gray-500 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-600"
          >
            Reset
          </button>
          <button
            onClick={increment}
            className="rounded-md bg-green-500 px-4 py-2 font-medium text-white transition-colors hover:bg-green-600"
          >
            Increment
          </button>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Edit <code className="rounded bg-gray-200 px-1 dark:bg-gray-700">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-gray-500 dark:text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
