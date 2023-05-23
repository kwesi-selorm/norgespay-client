import axios from "axios"

const apiURL = import.meta.env.VITE_API_URL
const useAPIConfig = () => {
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
		const user = sessionStorage.getItem("user")
		if (user) {
			const userObj = JSON.parse(user)
			config.headers.Authorization = `Bearer ${userObj.token}`
		}
		return config
	})

	return { api, apiWithToken }
}

export default useAPIConfig
