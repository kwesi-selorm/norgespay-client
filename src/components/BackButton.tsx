import styled from "styled-components"
import { CgArrowLeftR } from "react-icons/cg"
import { useNavigate } from "react-router-dom"

const BackButton = () => {
	const navigate = useNavigate()

	return (
		<StyledButton type="button" onClick={() => navigate(-1)}>
			<CgArrowLeftR className="back-arrow" />
			<h4>Back</h4>
		</StyledButton>
	)
}

const StyledButton = styled.button`
	align-items: center;
	background: ${({ theme }) => theme.appColors.red};
	border: none;
	color: ${({ theme }) => theme.appColors.white};
	display: flex;
	font-size: 0.9rem;
	gap: 0.5rem;
	margin-left: 5%;
	padding: 0.5rem 1.1rem;
	transition: background 0.3s ease-in-out;

	&:hover {
		background: ${({ theme }) => theme.appColors.hoverRed};
		cursor: pointer;
	}

	h4 {
		margin: 0;
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		font-size: 1rem;
	}
`

export default BackButton
