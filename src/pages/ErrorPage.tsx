import styled from "styled-components"
import Button from "../components/Button"
import { useNavigate } from "react-router-dom"
import parseError from "../helpers/error-handler"

type Props = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	error?: any
}

const ErrorPage = ({ error }: Props) => {
	const navigate = useNavigate()
	const errorObj = parseError(error)

	function handleNavigateToHome() {
		navigate("/")
	}

	return (
		<Wrapper>
			<h1>OOPS!</h1>
			{error !== undefined ? (
				<>
					<h3 style={{ fontFamily: "Agrandir Heavy" }}>Something went wrong</h3>
					{errorObj !== undefined ? (
						<h3>
							Status:{errorObj?.status}, Message: {errorObj?.content}
						</h3>
					) : (
						<>
							{error?.response?.status ? (
								<h3>Status: {error?.response?.status}</h3>
							) : null}
							<br />
							<h3>Message: {error?.response?.data ?? error.message}</h3>
							<br />
							{error?.response?.statusText ? (
								<h3>Status text: {error?.response?.statusText}</h3>
							) : null}
						</>
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
			<h3 style={{ fontFamily: "Agrandir Heavy" }}>
				Return to the homepage and try again
			</h3>
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
	padding-top: 10%;
	padding-inline: 5%;
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
`

export default ErrorPage
