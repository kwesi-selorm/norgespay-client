import { ImSpinner3 } from "react-icons/im"
import styled from "styled-components"
const LoadingIcon = () => {
	return (
		<Wrapper>
			<ImSpinner3 className="spinner" />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	justify-content: center;

	.spinner {
		animation: spin 2s infinite linear;
		color: ${(props) => props.theme.appColors.red};
		font-size: 2rem;
		margin-inline: auto;
		margin-top: 25%;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

export default LoadingIcon
