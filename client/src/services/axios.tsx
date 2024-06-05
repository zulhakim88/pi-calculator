import axios from "axios";

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
})

service.interceptors.request.use((request) => {
    request.headers.Authorization = localStorage.getItem("token")
    return request
})


export default service