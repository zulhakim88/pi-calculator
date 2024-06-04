import axios, { AxiosResponse } from "axios";

const accessToken = localStorage.getItem("token") ? localStorage.getItem("token") : ""

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: accessToken
    }
})

service.interceptors.response.use((response: AxiosResponse): AxiosResponse => {
    return response
})


export default service