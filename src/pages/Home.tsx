import styled from "styled-components"
import SalaryPhoto from "../assets/images/home-image.jpg"
import { useNavigate } from "react-router-dom"
import { TbCircleArrowRightFilled } from "react-icons/all"

const Home = () => {
	const navigate = useNavigate()

	function handleProceedButtonClick() {
		navigate("/login")
	}

	return (
		<Container className="container">
			<TextWrapper>
				<h1 className="title">NorgesPAY</h1>
				<p className="subtext">
					Look up verified salary data from all over Norway.
					<br />
					Better inform your next job interview negotiation or hiring decision!
					<br />
					Feel free to contribute <u>anonymously</u> to help others.
				</p>
				<div className="button-container">
					<StyledButton
						className="proceed-button"
						type="button"
						onClick={handleProceedButtonClick}
					>
						Proceed
						<TbCircleArrowRightFilled />
					</StyledButton>
				</div>
			</TextWrapper>
			<ImageWrapper className="image-box">
				<a href="https://www.freepik.com/free-vector/financial-data-concept-illustration_9793480.htm#page=6&query=money&position=13&from_view=search&track=sph">
					<img
						className="image"
						src={SalaryPhoto}
						alt="Salary photo-Image by storyset on Freepik"
					/>
				</a>
			</ImageWrapper>
		</Container>
	)
}

const StyledButton = styled.button`
	align-items: center;
	background: ${({ theme }) => theme.appColors.blue};
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	color: ${({ theme }) => theme.appColors.white};
	display: flex;
	font-family: "Agrandir", sans-serif;
	font-size: 1.3rem;
	gap: 0.5rem;
	padding: 0.7rem;
	transition: transform 0.3s ease-out;

	&:hover {
		background: ${({ theme }) => theme.appColors.hoverBlue};
		cursor: pointer;
		transform: scale(1.1);
	}
`

const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	margin-inline: 10%;
	margin-top: 15%;

	// MOBILE
	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		flex-wrap: wrap;
		justify-content: center;

		.title {
			font-size: 2.3rem;
			margin-top: 5rem;
		}
		.subtext {
			font-size: 1.3rem;
		}
	}

	// TABLET
	@media (max-width: ${({ theme }) => theme.screenWidth.tablet}) {
		flex-wrap: wrap;
		justify-content: center;
	}
`

const TextWrapper = styled.div`
	margin-inline: auto;
	max-width: 80vw;
	text-align: left;
	transform: translateY(10%);

	.button-container {
		align-items: center;
		display: flex;
		text-decoration: none;

		.forward-arrow {
			color: ${({ theme }) => theme.appColors.blue};
			font-size: 1.5rem;
			transform: translateX(-2rem);
			transition: transform 0.3s ease-in-out;
			z-index: -1;
		}
	}
	.button-container:hover {
		.forward-arrow {
			transform: scale(1.5) translateX(0.5rem);
		}
	}

	h1 {
		color: ${(props) => props.theme.appColors.red};
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 4rem;
		margin-bottom: 0;
	}
	p {
		font-size: 1.5rem;
	}

	//MOBILE
	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		transform: translateY(10%);
	}

	//TABLET
	@media (max-width: ${({ theme }) => theme.screenWidth.tablet}) {
		transform: translateY(10%);
	}
`

const ImageWrapper = styled.div`
	transform: translateY(10%);
	width: 70%;
	z-index: -1000;

	img {
		width: 100%;
	}

	&:hover {
		cursor: pointer;
	}

	//MOBILE
	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		transform: translateY(10%);
	}

	//TABLET
	@media (max-width: ${({ theme }) => theme.screenWidth.tablet}) {
		transform: translateY(10%);
	}

	//LARGE SCREEN
	@media (min-width: ${({ theme }) => theme.screenWidth.laptopAndDesktop}) {
		width: 50%;
	}
`

export default Home
