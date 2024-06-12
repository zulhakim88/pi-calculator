import axios from "axios"

const service = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
})

service.interceptors.request.use((request) => {
	request.headers.Authorization = localStorage.getItem("token")
	return request
})

service.interceptors.response.use(
	(response) => {
		return response.data
	},
	(error) => {
		if (error.code === "ERR_NETWORK") {
			alert("Server is down!")
			throw new Error(`Error code: ${error.code} with message: ${error.message}`)
		}
		if (error.response.data.error) {
			alert(error.response.data.error)
			throw new Error(error.response.data.error)
		}

		throw new Error(`Error code: ${error.code} with message: ${error.message}`)
	}
)

export default service
