import {httpInterceptedService} from "@core/http-service.js";
import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import {CategoryList} from "../features/categories/components/category-list.jsx";


export const CourseCategories = () => {

    const data = useLoaderData();


    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a href="#" className="btn btn-primary fw-bolder mt-n1">
                        افزودن دسته جدید
                    </a>
                </div>
            </div>
            <Suspense fallback={<p className="text-info">در حال دریافت اطلاعات</p>}>
                <Await resolve={data.categories}>

                    {
                        (loadedCategories)=> <CategoryList categories={loadedCategories}/>
                    }

                </Await>
            </Suspense>

        </div>
    )
}


export const getCategories = async () => {
    return {
        categories: loaderCategories()
    }
}

const loaderCategories = async () => {
    const response = await httpInterceptedService.get(`/CourseCategory/sieve `);
    return response.data;
}


