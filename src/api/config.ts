import axios from "axios"

export const baseURL = import.meta.env.DEV
	? "http://localhost:3000/api"
	: "https://norges-pay-server.herokuapp.com/api"

const api = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json"
	}
})

export default api
