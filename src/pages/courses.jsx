import {httpInterceptedService} from "@core/http-service.js";
import {CourseList} from "../features/courses/components/course-list.jsx";


export const Courses = () => {

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a href="#" className="btn btn-primary fw-bolder mt-n1">
                        افزودن دوره جدید
                    </a>
                </div>
                <CourseList/>
            </div>
        </div>
    )
}


export async function getListCourse() {
    const response = await httpInterceptedService.get('/Course/list');
    return response.data;
}