import {createBrowserRouter} from "react-router-dom";
import Login, {loginAction} from "./features/identity/components/login.jsx";
import Register from "./features/identity/components/register.jsx";
import IndentifyLayout from "./layouts/indentify-layout.jsx";
import {registerAction} from './features/identity/components/register.jsx'
import MainLayout from "./layouts/mainLayout/main-layout.jsx";
import {Courses, getListCourse} from "./pages/courses.jsx";
import {CourseCategories, getCategories} from "./pages/course-categories.jsx";
import {CourseDetails, getCourseDetails} from "./features/courses/components/course-details.jsx";
import {CategoryProvider} from "./features/categories/components/category-context.jsx";
import {NotFound} from "./pages/not-found.jsx";
import {UnhandledException} from "./pages/unhandled-exception.jsx";

const router = createBrowserRouter([
        {
            path: '/',
            element: <MainLayout/>,
            errorElement: <UnhandledException/>,
            children:
                [
                    {
                        element: <Courses/>,
                        index: true,
                        loader: getListCourse
                    },
                    {
                        path: "course-categories",
                        element: (
                            <CategoryProvider>
                                <CourseCategories/>
                            </CategoryProvider>
                        ),
                        loader: getCategories,
                    },
                    {
                        path: '/courses/:id',
                        element: <CourseDetails/>,
                        loader: getCourseDetails
                    }
                ]
        },
        {
            element: <IndentifyLayout/>,
            children:
                [
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
        }
        ,
        {
            path: '*',
            element:
                <NotFound/>
        }

    ])
;

export default router;