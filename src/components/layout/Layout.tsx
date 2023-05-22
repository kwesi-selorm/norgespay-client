import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import BackButtonBar from "./BackButtonBar"
import { UserContext } from "../../contexts/UserContext"
import { GrLogout } from "react-icons/gr"
import { LoggedInUser } from "../../@types/types"
import theme from "../../styles/theme"
import { useNavigate } from "react-router-dom"
import useMessage from "../../hooks/useMessage"

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
		localStorage.removeItem("user")
		navigate("/login")
		return showMessage({
			type: "info",
			content: "Logged out successfully"
		})
	}

	return (
		<StatusWrapper>
			{contextHolder}
			{loggedInUser != null && (
				<div className="user-status" onClick={handleLogout}>
					<p>Sign out ({loggedInUser.username})</p>
					<GrLogout className="icon" />
				</div>
			)}
		</StatusWrapper>
	)
}

const StatusWrapper = styled.div`
	.user-status {
		align-items: center;
		display: flex;
		gap: 0.5rem;

		p {
			margin: 0;
			padding-top: 0.2rem;
		}

		svg {
			font-size: 1.3rem;
			transition: transform 0.3s ease-out;
			path {
				stroke: ${theme.appColors.white};
			}
		}
	}
	.user-status:hover {
		cursor: pointer;
		.icon {
			transform: scale(1.1);
		}
	}
`

const Layout = ({ children }: { children?: React.ReactNode }) => {
	const { loggedInUser, setLoggedInUser } = useContext(UserContext)

	useEffect(() => {
		const user = localStorage.getItem("user")
		if (user) {
			setLoggedInUser(JSON.parse(user))
		}
	}, [])

	return (
		<Wrapper>
			<Navbar>
				<AppName>NorgesPAY</AppName>
				<UserStatus
					loggedInUser={loggedInUser}
					setLoggedInUser={setLoggedInUser}
				/>
			</Navbar>
			<BackButtonBar />
			{children}
		</Wrapper>
	)
}

const Wrapper = styled.div``

const Navbar = styled.nav`
	align-items: center;
	background: ${theme.appColors.darkBlue};
	color: ${theme.appColors.white};
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-bottom: 1rem;
	padding-inline: 2%;
	position: sticky;
`

const AppName = styled.h2`
	font-family: Agrandir Heavy, sans-serif;
	font-size: x-large;
`

export default Layout
