import axios, { AxiosResponse } from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

service.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
    return response
})

service.interceptors.request.use((request) => {
    request.headers.Authorization = localStorage.getItem("token")
    return request
})


export default service