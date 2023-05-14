import axios from "axios"

// export const baseURL = "https://norges-pay-server.herokuapp.com/api"
export const baseURL = "http://localhost:3000/api"

const api = axios.create({
	baseURL
})

export default api
