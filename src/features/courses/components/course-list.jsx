import {useLoaderData} from "react-router-dom";
import {Course} from "./course.jsx";


export const CourseList = () => {
    const listCourses = useLoaderData();

    console.log(listCourses);
    return (
        <>
            <div className="row">
                {listCourses.map((course) => (
                    <div className="col-3" key={course.id}>
                        <Course {...course}/>
                    </div>
                ))}
            </div>
        </>
    )
}