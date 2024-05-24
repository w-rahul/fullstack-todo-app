import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CreateTodo />
    </div>
  )
}

export default App