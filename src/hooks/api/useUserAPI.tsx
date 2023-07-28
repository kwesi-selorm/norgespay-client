import useAPIConfig from "./useAPIConfig"
import { LoggedInUser, SignUpInput } from "../../@types/types"
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

const useUserAPI = () => {
	const { api, apiWithToken } = useAPIConfig()
	const { loggedInUser } = useContext(UserContext)

	async function logIn(username: string, password: string): Promise<LoggedInUser | undefined> {
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

	async function getUser(id: string): Promise<LoggedInUser | undefined> {
		const response = await apiWithToken.get(`/users/${id}`)
		return response.data
	}

	async function refetchUser(id: string | undefined) {
		if (id === undefined) return
		const user = await getUser(id)
		if (user) {
			sessionStorage.setItem("user", JSON.stringify({ ...user, token: loggedInUser?.token }))
		}
	}

	return {
		logIn,
		signUp,
		getUser,
		refetchUser
	}
}

export default useUserAPI
