import useAPIConfig from "./useAPIConfig"
import { LoggedInUser } from "../../@types/types"

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

	return {
		logIn
	}
}

export default useUserAPI
