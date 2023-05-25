import { LoggedInUser } from "../@types/types"
import React, { createContext, useMemo, useState } from "react"
import { getUserFromStorage } from "../util/local-storage"

interface IUserContext {
	loggedInUser: LoggedInUser | null
	setLoggedInUser: (user: LoggedInUser | null) => void
}

const user = getUserFromStorage()

const InitialUserContextState: IUserContext = {
	loggedInUser: user,
	setLoggedInUser: (user: LoggedInUser | null) => {
		console.log(user)
	}
}

export const UserContext = createContext<IUserContext>(InitialUserContextState)

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [loggedInUser, setLoggedInUser] = useState<IUserContext["loggedInUser"] | null>(
		InitialUserContextState.loggedInUser
	)

	const value = useMemo(
		() => ({
			loggedInUser,
			setLoggedInUser
		}),
		[loggedInUser]
	)

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export default UserContextProvider
