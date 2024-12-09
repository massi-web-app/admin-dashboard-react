import {useForm} from "react-hook-form";
import {httpInterceptedService} from "@core/http-service.js";
import {toast} from "react-toastify";
import {useNavigate, useNavigation} from "react-router-dom";
import {useCategoryContext} from "./category-context.jsx";
import {useEffect} from "react";

export const AddOrUpdateCategory = ({setShowAddCategory}) => {


    const navigate = useNavigate();
    const {register, setValue, handleSubmit, formState: {errors}} = useForm();

    const {category, setCategory} = useCategoryContext();

    useEffect(() => {
        if (category) {
            setValue("name", category.name);
            setValue("id", category.id);
        }
    }, [category]);

    const onSubmit = (data) => {
        setShowAddCategory(false);
        const response = httpInterceptedService.post('/CourseCategory', data);

        toast.promise(
            response,
            {
                pending: 'در حال انجام عملیات',
                success: {
                    render() {
                        const url = new URL(window.location);
                        navigate(url.pathname + url.search);
                        if (category) {
                            setCategory(null);
                        }
                        return 'عملیات با موفقیت انجام شد'
                    }
                },
                error: {
                    render({data}) {
                        console.log(data);
                        debugger;
                        if (data.response.status === 400) {
                            return "امکان دسته تکرار وجود ندارد";
                        } else {
                            return "خطا در اجرای عملیات وجود دارد"
                        }
                    }
                }
            }, {
                position: 'bottom-left'
            }
        )
    }


    const onClose = () => {
        setShowAddCategory(false)
        if (category){
            setCategory(null);
        }
    }
    return (
        <div className="card">
            <div className="card-body">
                <form className="mb-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="form-label" htmlFor="name">نام</label>
                        <input type="text"
                               {...register('name', {
                                   required: true
                               })}
                               className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}/>
                        {errors.name && errors.name.type === "required" && (
                            <p className="text-danger small fw-bolder mt-1">
                                نام الزامی میباشد
                            </p>
                        )}
                    </div>
                    <div className="text-start mt-3">
                        <button type="button" className="btn btn-lg btn-secondary ms-2"
                                onClick={onClose}>
                            بستن
                        </button>
                        <button type="submit" className="btn btn-lg btn-primary ms-2">
                            ثبت تغییرات
                        </button>
                    </div>
                </form>
            </div>

        </div>
    )
}