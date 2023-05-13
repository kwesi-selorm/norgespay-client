import styled from "styled-components"

type Props = {
	jobTitle: string
	city: string
	lastModified: string
}

const SalaryCard = ({ jobTitle, city, lastModified }: Props) => {
	return (
		<Wrapper title="Select for more info">
			<h2>{jobTitle}</h2>
			<h4>{city}</h4>
			<p>Last modified: {lastModified}</p>
		</Wrapper>
	)
}

export default SalaryCard

const Wrapper = styled.article`
	background-color: ${({ theme }) => theme.appColors.blue};
	border-radius: ${({ theme }) => theme.borderRadius.extraLarge};
	box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
		rgba(0, 0, 0, 0.22) 0px 15px 12px;
	color: ${({ theme }) => theme.appColors.white};
	font-family: "Agrandir", sans-serif;
	margin-inline: auto;
	padding: 1rem 3.5rem 0.5rem;
	text-align: center;
	transition: transform 0.3s ease-in-out;
	width: fit-content;

	h2,
	h4,
	p {
		margin: 0.5rem;
	}

	h2 {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 1.7rem;
	}
	h4 {
		font-size: 1.3rem;
	}
	p {
		font-size: 1rem;
	}

	&:hover {
		transform: scale(1.05);
	}
`
