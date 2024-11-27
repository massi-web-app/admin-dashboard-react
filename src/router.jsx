import {createBrowserRouter} from "react-router-dom";
import Login, {loginAction} from "./features/identity/components/login.jsx";
import Register from "./features/identity/components/register.jsx";
import IndentifyLayout from "./layouts/indentify-layout.jsx";
import {registerAction} from './features/identity/components/register.jsx'
import MainLayout from "./layouts/mainLayout/main-layout.jsx";
import {Courses, getListCourse} from "./pages/courses.jsx";
import {CourseCategories} from "./pages/course-categories.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                element: <Courses/>,
                index: true,
                loader: getListCourse
            },
            {
                path:"course-categories",
                element: <CourseCategories/>,
            }
        ]
    },
    {
        element: <IndentifyLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>,
                action: loginAction,
                errorElement: <Login/>
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