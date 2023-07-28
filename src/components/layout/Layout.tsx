import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import BackButtonBar from "./BackButtonBar"
import { UserContext } from "../../contexts/UserContext"
import { LoggedInUser } from "../../@types/types"
import theme from "../../styles/theme"
import { Link, useNavigate } from "react-router-dom"
import useMessage from "../../hooks/useMessage"
import { UserIcon } from "../../assets/icons"
import { Dropdown, MenuProps } from "antd"
import { useQuery } from "@tanstack/react-query"
import useUserAPI from "../../hooks/api/useUserAPI"

export const UserStatus = ({
	loggedInUser,
	setLoggedInUser
}: {
	loggedInUser: LoggedInUser | null
	setLoggedInUser: (loggedInUser: LoggedInUser | null) => void
}) => {
	const navigate = useNavigate()
	const { showMessage, contextHolder } = useMessage()

	function handleLogout() {
		setLoggedInUser(null)
		sessionStorage.removeItem("user")
		navigate("/login")
		return showMessage({
			type: "info",
			content: "Logged out successfully"
		})
	}

	const items: MenuProps["items"] = [
		{
			key: "Logout",
			label: <SignoutItem onClick={handleLogout}>Sign out</SignoutItem>
		}
	]

	return (
		<StatusWrapper>
			{contextHolder}
			{loggedInUser != null && (
				<Dropdown arrow={{ pointAtCenter: true }} menu={{ items }} placement="bottomLeft">
					<div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
						<p style={{ marginTop: "20px" }}>{loggedInUser.username}</p>
						<UserIcon />
					</div>
				</Dropdown>
			)}
		</StatusWrapper>
	)
}

const StatusWrapper = styled.div`
	svg {
		font-size: 1.5rem;
		transition: transform 0.3s ease-out;
		path {
			stroke: ${theme.appColors.white};
		}
	}
	svg:hover {
		cursor: pointer;
	}
`

const SignoutItem = styled.div`
	display: flex;
	svg {
		margin: 0;
	}
`

const Layout = ({ children }: { children?: React.ReactNode }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)
	const { getUser } = useUserAPI()

	const { data } = useQuery(
		["user", loggedInUser?.userId],
		() => {
			if (loggedInUser == null) return
			const { userId } = loggedInUser
			return getUser(userId)
		},
		{
			refetchOnWindowFocus: false,
			retry: 1
		}
	)

	useEffect(() => {
		if (data !== undefined) {
			sessionStorage.setItem("user", JSON.stringify({ ...data, token: loggedInUser?.token }))
		}
		const user = sessionStorage.getItem("user")
		if (user) {
			setLoggedInUser(JSON.parse(user))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Wrapper>
			<Navbar>
				<AppName to="/">NorgesPAY</AppName>
				<UserStatus loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
			</Navbar>
			<BackButtonBar />
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div``

const Navbar = styled.nav`
	align-items: center;
	background: ${theme.appColors.red};
	color: ${theme.appColors.white};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding: 1% 5%;
	position: sticky;
`

const AppName = styled(Link)`
	font-size: x-large;
	font-weight: 900;
	text-decoration: none;
	color: ${theme.appColors.white};
`

export default Layout
