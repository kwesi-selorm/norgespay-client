import styled from "styled-components"
import { ReactNode } from "react"

type Props = {
	className?: string
	icon?: ReactNode
	innerText: string
	size?: "small" | "large" | undefined
	cancelButton?: boolean
	onClick?: () => void
	type: "button" | "submit" | "reset" | undefined
	disabled?: boolean
}

const Button = ({
	icon,
	innerText,
	size,
	cancelButton,
	onClick,
	type,
	disabled
}: Props) => {
	return (
		<StyledButton
			size={size}
			cancelButton={cancelButton}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{icon}
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
	border: 0;
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	color: ${({ theme }) => theme.appColors.white};
	display: flex;
	font-family: "Agrandir", sans-serif;
	font-size: ${({ size }) => (size === "small" ? "0.9rem" : "1rem")};
	gap: 0.5rem;
	padding: ${({ theme, size }) =>
		size === "small"
			? `${theme.spacing.small} ${theme.spacing.medium}`
			: `${theme.spacing.medium} ${theme.spacing.large}`};
	transition: font-size 0.2s ease-in-out, background 0.2s ease;

	svg {
		path {
			stroke: ${({ theme }) => theme.appColors.white};
			stroke-width: 3px;
		}
	}

	&:hover {
		background: ${({ theme, cancelButton }) =>
			cancelButton ? theme.appColors.hoverRed : theme.appColors.hoverBlue};
		cursor: pointer;
	}
	&:disabled {
		background: ${({ theme }) => theme.colors.secondary};
		border: 0;
		outline: 0;
	}
`

export default Button
