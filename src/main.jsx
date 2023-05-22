import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {CalendarProvider} from "./context/CalendarContext";
import {AuthProvider} from "./context/AuthContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <AuthProvider>
        <CalendarProvider>
            <App/>
        </CalendarProvider>
    </AuthProvider>
    </React.StrictMode>,
)
