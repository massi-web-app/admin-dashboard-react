import {createBrowserRouter} from "react-router-dom";
import Login from "./features/identity/components/login.jsx";
import Register from "./features/identity/components/register.jsx";
import IndentifyLayout from "./layouts/indentify-layout.jsx";
import {registerAction} from './features/identity/components/register.jsx'

const router = createBrowserRouter([
    {
        element: <IndentifyLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>,
                action: registerAction,
                errorElement: <Register/>
            }
        ],
    },

]);

export default router;