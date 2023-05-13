import styled from "styled-components"
import Button from "../components/Button.tsx"
import SalaryPhoto from "../assets/images/home-image.jpg"
import { Link } from "react-router-dom"

const Home = () => {
	return (
		<Container className="container">
			<TextWrapper>
				<h1 className="title">NorgesPAY</h1>
				<p className="subtext">
					Look up verified salary data from all over Norway.
					<br />
					Better inform your next job interview negotiation or hiring decision!
					<br />
					Feel free to contribute to help others.
				</p>
				<Link to="/salaries">
					<Button
						className="proceed-button"
						innerText="Proceed"
						size="large"
						type="button"
					/>
				</Link>
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

const Container = styled.div`
	align-items: center;
	display: flex;
	flex-direction: row;
	margin-inline: 10%;

	// MOBILE
	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		.title {
			font-size: 2.3rem;
			margin-top: 8rem;
		}

		.subtext {
			font-size: 1.5rem;
		}

		& .image {
			left: 2rem;
			top: -12rem;
		}
	}
`

const TextWrapper = styled.div`
	margin-inline: auto;
	margin-top: 2rem;
	max-width: 80vw;
	text-align: left;

	h1 {
		color: ${(props) => props.theme.appColors.red};
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 4rem;
		margin-bottom: 0;
	}

	p {
		font-size: 1.5rem;
	}
`

const ImageWrapper = styled.div`
	img {
		width: 100%;
	}

	&:hover {
		cursor: pointer;
	}

	// MOBILE
	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		img {
			//left: 2rem;
			top: 0;
			object-fit: cover;
		}
	}
`

export default Home
