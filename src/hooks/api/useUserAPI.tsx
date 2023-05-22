import useAPIConfig from "./useAPIConfig"
import { LoggedInUser, SignUpInput } from "../../@types/types"

const useUserAPI = () => {
	const { api } = useAPIConfig()

	async function logIn(
		username: string,
		password: string
	): Promise<LoggedInUser | undefined> {
		const response = await api.post("/users/login", {
			username,
			password
		})
		return response.data
	}

	async function signUp(data: SignUpInput) {
		const response = await api.post("/users/signup", data)
		return response.data
	}

	return {
		logIn,
		signUp
	}
}

export default useUserAPI
