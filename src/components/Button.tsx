import styled from "styled-components"

type Props = {
	className?: string
	innerText: string
	size?: "small" | "large" | undefined
	cancelButton?: boolean
	onClick?: () => void
	type: "button" | "submit" | "reset" | undefined
}

const Button = ({ innerText, size, cancelButton, onClick, type }: Props) => {
	return (
		<StyledButton
			size={size}
			cancelButton={cancelButton}
			onClick={onClick}
			type={type}
		>
			{innerText}
		</StyledButton>
	)
}

const StyledButton = styled.button<{
	size: "small" | "large" | undefined
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
	transition: font-size 0.2s ease-in-out, background 0.2s ease;

	&:hover {
		background: ${({ theme, cancelButton }) =>
			cancelButton ? theme.appColors.hoverRed : theme.appColors.hoverBlue};
		font-size: ${({ size }) => (size === "small" ? "0.95rem" : "1.05rem")};
	}
`

export default Button
