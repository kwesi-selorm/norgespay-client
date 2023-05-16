import styled from "styled-components"
import { BsArrowLeftSquareFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
	const navigate = useNavigate()

	return (
		<StyledButton type="button" onClick={() => navigate(-1)}>
			<BsArrowLeftSquareFill className="back-arrow" />
			Go back
		</StyledButton>
	)
}

const StyledButton = styled.button`
	background: ${({ theme }) => theme.appColors.red};
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	color: ${({ theme }) => theme.appColors.white};
	display: flex;
	font-family: "Agrandir Bold", sans-serif;
	gap: 0.5rem;
	margin-left: 5%;
	padding: 0.7rem;

	.back-arrow {
		transition: transform 0.3s ease-in-out;
	}

	&:hover {
		background: ${({ theme }) => theme.appColors.hoverRed};
		cursor: pointer;
	}
`

export default BackButton
