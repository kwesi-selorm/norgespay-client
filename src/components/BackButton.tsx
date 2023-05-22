import styled from "styled-components"
import { TbCircleArrowLeftFilled } from "react-icons/tb"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
	const navigate = useNavigate()

	return (
		<StyledButton type="button" onClick={() => navigate(-1)}>
			<TbCircleArrowLeftFilled className="back-arrow" />
			Back
		</StyledButton>
	)
}

const StyledButton = styled.button`
	align-items: center;
	background: ${({ theme }) => theme.appColors.red};
	border: none;
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	color: ${({ theme }) => theme.appColors.white};
	display: flex;
	font-family: "Agrandir Bold", sans-serif;
	font-size: 1.1rem;
	gap: 0.5rem;
	margin-left: 5%;
	padding: 0.5rem 1.1rem;
	transition: background 0.3s ease-in-out;

	&:hover {
		background: ${({ theme }) => theme.appColors.hoverRed};
		cursor: pointer;
		//transform: scale(1.1);
	}

	svg {
		margin-bottom: 0.3rem;
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		font-size: 1rem;
	}
`

export default BackButton
