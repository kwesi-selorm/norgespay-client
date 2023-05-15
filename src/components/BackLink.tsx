import styled from "styled-components"
import { BsArrowLeft } from "react-icons/bs"
import { useNavigate } from "react-router-dom"

const BackLink = () => {
	const navigate = useNavigate()

	return (
		<TextButton type="button" onClick={() => navigate(-1)}>
			<BsArrowLeft className="back-arrow" />
			Go back
		</TextButton>
	)
}

const TextButton = styled.button`
	background: none;
	border: none;
	color: ${({ theme }) => theme.appColors.red};
	display: flex;
	font-family: "Agrandir Bold", sans-serif;
	font-size: 1rem;
	gap: 0.5rem;
	margin-left: 10%;

	.back-arrow {
		transition: transform 0.3s ease-in-out;
	}

	&:hover {
		border-bottom: 2px solid ${({ theme }) => theme.appColors.red};
		cursor: pointer;

		.back-arrow {
			transform: scale(1.5) translateX(-0.2rem);
		}
	}
`

export default BackLink
