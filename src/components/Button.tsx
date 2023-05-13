import styled from "styled-components"

type Props = {
	innerText: string
	size?: string
	cancelButton?: boolean
}

const Button = ({ innerText, size, cancelButton }: Props) => {
	return (
		<StyledButton size={size} cancelButton={cancelButton}>
			{innerText}
		</StyledButton>
	)
}

const StyledButton = styled.button<{
	size: string | undefined
	cancelButton: boolean | undefined
}>`
	background: ${({ theme, cancelButton }) =>
		cancelButton ? theme.appColors.red : theme.appColors.blue};
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	color: ${({ theme }) => theme.appColors.white};
	font-family: "Agrandir", sans-serif;
	font-size: ${({ size }) => (size === "small" ? "0.9rem" : "1rem")};
	border: 0;
	padding: ${({ theme, size }) =>
		size === "small"
			? `${theme.spacing.small} ${theme.spacing.medium}`
			: `${theme.spacing.medium} ${theme.spacing.large}`};

	&:hover {
		background-color: ${({ theme, cancelButton }) =>
			cancelButton ? theme.appColors.hoverRed : theme.appColors.hoverBlue};
	}
`

export default Button
