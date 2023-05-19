import {useEffect, useState} from 'react'
import './App.scss'
import Calendar from "./Calendar/Calendar";
import Header from "./components/Header/Header";
import {RouterProvider} from "react-router-dom";
import routes from "./Routes/routes";
import axios from "axios";

function App() {


    if (import.meta.env.DEV) {
        axios.defaults.baseURL = "http://localhost:4000"
    } else {
        axios.defaults.baseURL = "https://google-calendar-api-psi.vercel.app"
    }

    axios.interceptors.request.use(function (config) {

        // Do something before request is sent
        let token = localStorage.getItem("token")
        config.headers["authorization"] = token;

        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

    return (
        <div className="App">
            <RouterProvider router={routes}/>
        </div>
    )
}

export default App


