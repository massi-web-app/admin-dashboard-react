import {Link, useNavigation, useSubmit} from 'react-router-dom'
import logo from '@assets/images/logo.svg'
import {useForm, Form} from "react-hook-form";
import {httpService} from "../../../core/http-service.js";
import {useActionData, useNavigate, useRouteError} from 'react-router-dom';
import {useEffect, useTransition} from "react";
import {useTranslation} from "react-i18next";

const Register = () => {

    const {register, watch, handleSubmit, formState: {errors}} = useForm();

    const {t} = useTranslation();


    const submitForm = useSubmit();

    const onSubmit = (data) => {
        const {confirm_password, ...userData} = data;

        submitForm(userData, {
            method: 'POST'
        });
        console.log(data);
    }

    const navigation = useNavigation();
    const isSubmitting = navigation.state !== 'idle';
    const isSuccessOperation = useActionData();
    const navigate = useNavigate();
    const routerErrors = useRouteError();

    useEffect(() => {

        if (isSuccessOperation) {
            setTimeout(() => {
                navigate(`/login`);
            }, []);
        }

    }, [isSuccessOperation]);


    return (
        <>
            <div className="text-center mt-4">
                <img src={logo} style={{height: "100px"}}/>
                <h1 className="h2">{t('register.title')}</h1>
                <p className="lead">
                    {t('register.introMessage')}
                </p>
                <p className="lead">
                    {t('register.singIn')}
                    <Link to="/login" className="me-2">
                        {t('register.routeLogin')}
                    </Link>
                </p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="m-sm-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">{t('register.mobile')}</label>
                                <input
                                    {...register('mobile', {
                                        required: t('register.validation.mobileRequired'),
                                        minLength: 11,
                                        maxLength: 11,
                                    })}
                                    className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`}
                                />
                                {
                                    errors.mobile && errors.mobile.type === 'required' && (
                                        <p className={"text-danger small fw-bold mt-1"}>
                                            {errors.mobile?.message}
                                        </p>
                                    )
                                }
                                {
                                    errors.mobile && (errors.mobile.type === 'minLength' || errors.mobile.type === 'maxLength') && (
                                        <p className={"text-danger small fw-bold mt-1"}>
                                            {t('register.validation.mobileLength')}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('register.password')}</label>
                                <input
                                    {...register('password', {
                                        required: t('register.validation.password')
                                    })}
                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                                    type={"password"}
                                />
                                {
                                    errors.password && errors.password.type === 'required' && (
                                        <p className={"text-danger small fw-bold mt-1"}>
                                            {errors.password?.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">{t('register.repeatPassword')}</label>
                                <input
                                    {...register('confirm_password', {
                                        required: t('register.validation.repeatPassword'),
                                        validate: (value) => {
                                            if (watch('password') !== value) {
                                                return t('register.validation.notMatching')
                                            }
                                        }
                                    })}
                                    className={`form-control form-control-lg ${errors.confirm_password && 'is-invalid'}`}
                                    type="password"
                                />
                                {
                                    errors.confirm_password && errors.confirm_password.type === 'required' && (
                                        <p className={"text-danger small fw-bold mt-1"}>
                                            {errors.confirm_password?.message}
                                        </p>
                                    )
                                }
                                {
                                    errors.confirm_password && errors.confirm_password.type === 'validate' && (
                                        <p className={"text-danger small fw-bold mt-1"}>
                                            {errors.confirm_password?.message}
                                        </p>
                                    )
                                }
                            </div>
                            <div className="text-center mt-3">
                                <button disabled={isSubmitting} type="submit" className="btn btn-lg btn-primary">
                                    {isSubmitting ? t('register.saving') : t('register.register')}
                                </button>
                            </div>
                            {isSuccessOperation && (
                                <div className="alert alert-success text-success p-2 mt-3">
                                    { t('register.successOperation')}
                                </div>
                            )}
                            {
                                routerErrors && (
                                    <div className={`alert alert-danger text-danger p-2 mt-3`}>
                                        {routerErrors.response?.data.map((error) => (
                                            <p className={"mb-0"}>
                                                {error.description}
                                            </p>
                                        ))}
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Register;

export async function registerAction({request}) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await httpService.post('/Users', data);
    return response.status === 200;
}