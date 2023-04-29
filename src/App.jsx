import {useEffect, useState} from 'react'
import './App.scss'
import Calendar from "./Calendar/Calendar";
import Header from "./components/Header/Header";
import {RouterProvider} from "react-router-dom";
import routes from "./Routes/routes";
import axios from "axios";

function App() {
    const [count, setCount] = useState(0)

    if (import.meta.env.DEV) {

        axios.defaults.baseURL = "http://localhost:4000"
    } else {

        axios.defaults.baseURL = "https://google-calendar-api-psi.vercel.app"
    }

    return (
        <div className="App">
            <RouterProvider router={routes}/>
        </div>
    )
}

export default App


