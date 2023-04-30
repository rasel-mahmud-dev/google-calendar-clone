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

                    <div className="text-gray-50 bg-gray-50"></div>
                    <div className="text-gray-100 bg-gray-100"></div>
                    <div className="text-gray-200 bg-gray-200"></div>
                    <div className="text-gray-300 bg-gray-300"></div>
                    <div className="text-gray-400 bg-gray-400"></div>
                    <div className="text-gray-500 bg-gray-500"></div>
                    <div className="text-gray-600 bg-gray-600"></div>
                    <div className="text-gray-700 bg-gray-700"></div>
                    <div className="text-gray-800 bg-gray-800"></div>
                    <div className="text-gray-900 bg-gray-900"></div>


            {/*<RouterProvider router={routes}/>*/}
        </div>
    )
}

export default App


