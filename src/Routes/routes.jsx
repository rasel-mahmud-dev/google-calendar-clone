
import {createBrowserRouter} from "react-router-dom"
import Main from "../layout/Main";

import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage.jsx";
import Profile from "../pages/Profile.jsx";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/> ,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/join/:page",
                element: <AuthPage />,
            },
            {
                path: "/join",
                element: <AuthPage />,
            },

            {
                path: "/:view",
                element: <HomePage />,
            },
        ]
    }
])


export default routes