import { useState } from 'react'
import './App.scss'
import Calendar from "./Calendar/Calendar";
import Header from "./components/Header/Header";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Header />
      <Calendar />
    </div>
  )
}

export default App
