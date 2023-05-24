import styled from "styled-components"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import parseError from "../helpers/error-handler"
import theme from "../styles/theme"

type Props = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: any
}

const ErrorPage = ({ error }: Props) => {
	const navigate = useNavigate()
	const errorObj = parseError(error)

	function handleNavigateToHome() {
		navigate("/")
		localStorage.removeItem("user")
	}

	return (
		<Wrapper>
			<h1>OOPS!</h1>
			{error !== undefined ? (
				<>
					<h3 style={{ fontFamily: "Agrandir Heavy" }}>Something went wrong</h3>
					{errorObj !== undefined ? (
						<h3>
							Status: {errorObj?.status}
							<br />
							Message: {errorObj?.content}
						</h3>
					) : (
						<h3>Message: {JSON.stringify(error.message)}</h3>
					)}
				</>
			) : (
				<h3>
					Sorry, we could not find the page you were looking for.
					<br />
					Please check the URL to make sure you have the right address.
				</h3>
			)}
			<br />
			<br />
			<h3 style={{ fontFamily: "Agrandir Heavy" }}>Return to the homepage and try again</h3>
			<Button
				innerText="Return to Home"
				size="small"
				type="button"
				cancelButton={true}
				onClick={handleNavigateToHome}
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	background-color: ${({ theme }) => theme.appColors.blue};
	color: ${({ theme }) => theme.appColors.white};
	margin: 0 auto;
	min-height: 100vh;
	padding-top: 20%;
	padding-inline: 10%;
	text-align: center;

	h1 {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 3rem;
	}

	h3 {
		margin: 0;
	}
	button {
		margin-top: 1rem;
		margin-inline: auto;
	}

	@media (max-width: ${theme.screenWidth.laptopAndDesktop}) {
		padding-top: 10%;
	}
`

export default ErrorPage
