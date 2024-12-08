import {httpInterceptedService} from "@core/http-service.js";
import {Await, useLoaderData, useNavigate} from "react-router-dom";
import {Suspense, useState} from "react";
import {CategoryList} from "../features/categories/components/category-list.jsx";
import {Modal} from "../components/modal.jsx";
import {toast} from 'react-toastify'
import {useTranslation} from "react-i18next";
import {AddOrUpdateCategory} from "../features/categories/components/add-or-update-category.jsx";
import {useCategoryContext} from "../features/categories/components/category-context.jsx";


export const CourseCategories = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectCategory, setSelectCategory] = useState(null);
    const [showAddCategory, setShowAddCategory] = useState(false);
    const {category} = useCategoryContext();


    const {t} = useTranslation();
    const navigate = useNavigate();


    const deleteCategory = (categoryId) => {
        setSelectCategory(categoryId);
        setShowDeleteModal(true);
    }

    const handleDeleteCategory = async () => {

        setShowDeleteModal(false);
        const response = httpInterceptedService.delete(`/CourseCategory/${selectCategory}`);

        toast.promise(
            response,
            {
                pending: 'در حال حذف',
                success: {
                    render() {
                        const url = new URL(window.location);
                        navigate(url.pathname + url.search);
                        return 'عملیات با موفقیت انجام شد'
                    }
                },
                error: {
                    render({data}) {
                        console.log("Error", data)
                        return t('categoryList.' + data.response.data.code)
                    }
                }
            }, {
                position: 'bottom-left'
            }
        )

    }


    const data = useLoaderData();

    return (

        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <a className="btn btn-primary fw-bolder mt-n1"
                           onClick={() => setShowAddCategory(true)}>
                            افزودن دسته جدید
                        </a>
                    </div>
                </div>
                {
                    (showAddCategory || category) && <AddOrUpdateCategory setShowAddCategory={setShowAddCategory}/>
                }
                <Suspense fallback={<p className="text-info">در حال دریافت اطلاعات</p>}>
                    <Await resolve={data.categories}>
                        {
                            (loadedCategories) => <CategoryList deleteCategory={deleteCategory}
                                                                categories={loadedCategories}/>
                        }
                    </Await>
                </Suspense>

            </div>
            <Modal isOpen={showDeleteModal} open={setShowDeleteModal} title={"حذف"}
                   body={"آیا از حذف این دسته اطمینان دارید؟"}>
                <button type="button" onClick={() => setShowDeleteModal(false)} className="btn btn-secondary fw-bolder">
                    انصراف
                </button>
                <button type="button" className="btn btn-primary fw-bolder" onClick={handleDeleteCategory}>
                    حذف
                </button>
            </Modal>
        </>

    )
}


export const getCategories = async ({request}) => {
    return {
        categories: loaderCategories(request)
    }
}


const loaderCategories = async (request) => {
    const page = new URL(request.url).searchParams.get('page') || 1;
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    let url = `/CourseCategory/sieve`;
    url += `?page=${page}&pageSize=${pageSize}`;
    const response = await httpInterceptedService.get(url);
    return response.data;
}


