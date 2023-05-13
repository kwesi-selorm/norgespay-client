import styled from "styled-components"
// import BackArrow from "../assets/icons/arrow-left.svg"

const BackLink = () => {
	return (
		<TextButton type="button">
			{/*<BackArrow />*/}
			Go back
		</TextButton>
	)
}

const TextButton = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.appColors.red};
	font-family: "Agrandir Bold", sans-serif;
	font-size: 1rem;
	//transition: border-bottom 0.5s ease-in-out;

	&:hover {
		border-bottom: 2px solid ${({ theme }) => theme.appColors.red};
		cursor: pointer;
	}
`

export default BackLink
