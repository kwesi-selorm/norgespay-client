import { LoggedInUser } from "../@types/types"
import React, { createContext, useMemo, useState } from "react"

interface IUserContext {
	loggedInUser: LoggedInUser | null
	setLoggedInUser: (user: LoggedInUser | null) => void
}

const InitialUserContextState: IUserContext = {
	loggedInUser: {
		userId: "",
		username: "",
		contributedSalaries: {
			main: [],
			secondary: []
		},
		token: ""
	},
	setLoggedInUser: (user: LoggedInUser | null) => {
		console.log(user)
	}
}

export const UserContext = createContext<IUserContext>(InitialUserContextState)

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [loggedInUser, setLoggedInUser] = useState<
		IUserContext["loggedInUser"] | null
	>(InitialUserContextState.loggedInUser)

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
