import {httpInterceptedService} from "@core/http-service.js";
import {CourseList} from "../features/courses/components/course-list.jsx";
import {Await, defer, useLoaderData} from "react-router-dom";
import {Suspense} from "react";


export const Courses = () => {
    const data = useLoaderData();

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a href="#" className="btn btn-primary fw-bolder mt-n1">
                        افزودن دوره جدید
                    </a>
                </div>
                <Suspense fallback={<p className="text-info">درحال دریافت اطلاعات</p>}>
                    <Await resolve={data.courses}>
                        {
                            (loadCourses) => <CourseList courses={loadCourses}/>
                        }
                    </Await>
                </Suspense>

            </div>
        </div>
    )
}


export async function getListCourse() {

    return defer({

        courses: loadCourses()

    });


}

const loadCourses = async () => {
    const response = await httpInterceptedService.get('/Course/list');
    return response.data;
}