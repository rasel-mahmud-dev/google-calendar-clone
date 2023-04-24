
import {createBrowserRouter} from "react-router-dom"
import Main from "../layout/Main";

import HomePage from "../pages/HomePage";
import AppHome from "../pages/AppHome";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Main/> ,
        children: [
            {
                path: "",
                element: <AppHome />,
            },
            {
                path: "/calendar/:view",
                element: <HomePage />,
            },
        ]
    }
])


export default routes