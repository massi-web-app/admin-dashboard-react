import axios from "axios";

const BASE_URL = 'https://react-mini-projects-api.classbon.com';

export const httpService = axios.create({
    baseURL: BASE_URL
});


const httpInterceptedService = axios.create({
    baseURL: BASE_URL
})
 httpInterceptedService.interceptors.request.use(async (config) => {

    const token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`
        }
    }

    return config;
}, async (error) => {
    return Promise.reject(error);
})


export {httpInterceptedService}

