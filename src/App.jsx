import { useState } from 'react'
import './App.scss'
import Calendar from "./Calendar/Calendar";
import Header from "./components/Header/Header";
import {RouterProvider} from "react-router-dom";
import routes from "./Routes/routes";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <RouterProvider router ={routes} />
    </div>
  )
}

export default App


