import {createBrowserRouter} from "react-router-dom";
import Login from "./features/identity/components/login.jsx";
import Register from "./features/identity/components/register.jsx";

const router = createBrowserRouter([
    {
        path: 'login',
        element: <Login/>
    },
    {
        path: 'register',
        element: <Register/>
    }
]);

export default router;