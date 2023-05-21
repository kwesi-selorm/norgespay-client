import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

const apiURL = import.meta.env.VITE_API_URL
const useAPIConfig = () => {
	const { loggedInUser } = useContext(UserContext)
	const token = loggedInUser?.token
	if (!token) return

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

	apiWithToken.interceptors.request.use(
		(config) => {
			config.headers["Authorization"] = `Bearer ${token}`
			return config
		},
		(error) => {
			return Promise.reject(error)
		}
	)

	return { api, apiWithToken }
}

export default useAPIConfig
