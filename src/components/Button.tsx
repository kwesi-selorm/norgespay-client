import styled from "styled-components"
import { ReactNode } from "react"

type Props = {
	addButton?: boolean
	cancelButton?: boolean
	className?: string
	disabled?: boolean
	icon?: ReactNode
	innerText: string
	onClick?: () => void
	size?: "small" | "large" | undefined
	type: "button" | "submit" | "reset" | undefined
}

const Button = ({
	addButton,
	className,
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
			addButton={addButton}
			className={className}
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
	addButton?: boolean
	cancelButton?: boolean
	size?: "small" | "large"
}>`
	align-items: center;
	background: ${({ theme, addButton, cancelButton }) =>
		addButton
			? theme.appColors.green
			: cancelButton
			? theme.appColors.red
			: theme.appColors.blue};
	border: 0;
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	color: ${({ theme }) => theme.appColors.white};
	display: flex;
	font-family: "Agrandir", sans-serif;
	font-size: ${({ size }) => (size === "small" ? "0.9rem" : "1rem")};
	gap: 0.5rem;
	margin-inline: auto;
	max-width: fit-content;
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
		background: ${({ theme, addButton, cancelButton }) =>
			addButton
				? theme.appColors.hoverGreen
				: cancelButton
				? theme.appColors.hoverRed
				: theme.appColors.hoverBlue};
		cursor: pointer;
	}
	&:disabled {
		background: ${({ theme }) => theme.colors.secondary};
		border: 0;
		outline: 0;
	}
`

export default Button
