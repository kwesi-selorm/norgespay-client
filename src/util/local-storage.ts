import { LoggedInUser } from "../@types/types"

function getUserFromStorage(): LoggedInUser | null {
	const userStr = sessionStorage.getItem("user")
	if (userStr) {
		return JSON.parse(userStr)
	}
	return null
}

function saveUserToStorage(user: LoggedInUser): void {
	sessionStorage.setItem("user", JSON.stringify(user))
}

export { getUserFromStorage, saveUserToStorage }
