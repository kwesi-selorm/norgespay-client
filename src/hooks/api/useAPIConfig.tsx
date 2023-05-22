import axios from "axios"

const apiURL = import.meta.env.VITE_API_URL
const useAPIConfig = () => {
	const token = localStorage.getItem("token")

	const api = axios.create({
		baseURL: apiURL,
		headers: {
			"Content-Type": "application/json"
		}
	})

	const apiWithToken = axios.create({
		baseURL: apiURL,
		headers: {
			"Content-Type": "application/json"
		}
	})

	apiWithToken.interceptors.request.use((config) => {
		if (token != null) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	})

	return { api, apiWithToken }
}

export default useAPIConfig
