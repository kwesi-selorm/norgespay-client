import styled from "styled-components"
import Button from "../components/Button.tsx"
import { useNavigate } from "react-router-dom"

const ErrorPage = () => {
	const navigate = useNavigate()

	function handleNavigateToHome() {
		navigate("/")
	}

	return (
		<Wrapper>
			<h1>Oops!</h1>
			<h3>We could not find the page you were looking for.</h3>
			<h3>Return to the homepage and try again</h3>
			<Button
				innerText="Return to Home"
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
	text-align: center;

	h1 {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 3rem;
		//margin: 0;
	}

	h3 {
		margin: 0;
	}
	button {
		margin-top: ${({ theme }) => theme.spacing.large};
	}
`

export default ErrorPage
