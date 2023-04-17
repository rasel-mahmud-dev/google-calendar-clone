import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {CalendarProvider} from "./context/CalendarContext";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <CalendarProvider>
            <App/>
        </CalendarProvider>
    </React.StrictMode>,
)
