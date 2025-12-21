import { Axios, AxiosResponse, InternalAxiosRequestConfig } from './../node_modules/axios/index.d';
import axios from "axios";
const api = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_SPRING_API}` });

api.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        config.headers.Authorization = localStorage.getItem('capstoneToken') || "";
        return config;
    }
)

api.interceptors.response.use((res: AxiosResponse) :AxiosResponse => res,
(err) => {
    console.log("에러다!",err);
    if(err.response?.status===401){
        // window.location.href = "/login";
    } else if(err.response?.status === 403){

    }
}
)

export default api;