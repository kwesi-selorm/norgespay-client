import styled from "styled-components"
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	addButton?: boolean
	cancelButton?: boolean
	className?: string
	disabled?: boolean
	icon?: ReactNode
	innerText: string
	onClick?: MouseEventHandler<HTMLButtonElement>
	size?: "small" | "medium" | "large"
	type: "button" | "submit" | "reset" | undefined
}

function getButtonColor(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	theme: any,
	addButton?: boolean,
	cancelButton?: boolean
) {
	if (addButton) {
		return theme.appColors.green
	} else if (cancelButton) {
		return theme.appColors.red
	} else {
		return theme.appColors.blue
	}
}

function getButtonColorOnHover(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	theme: any,
	addButton?: boolean,
	cancelButton?: boolean
) {
	if (addButton) {
		return theme.appColors.hoverGreen
	} else if (cancelButton) {
		return theme.appColors.hoverRed
	} else {
		return theme.appColors.hoverBlue
	}
}

const Button = ({ addButton, className, icon, innerText, size, cancelButton, onClick, type, disabled }: Props) => {
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
	size?: "small" | "medium" | "large"
}>`
	align-items: center;
	background: ${({ theme, addButton, cancelButton }) => getButtonColor(theme, addButton, cancelButton)};
	border: 0;
	border-radius: ${({ theme }) => theme.borderRadius.small};
	color: ${({ theme }) => theme.appColors.white};
	display: flex;
	gap: 0.5rem;
	max-width: fit-content;
	font-size: ${({ size }) => {
		if (size === "small") {
			return "0.8rem"
		} else if (size === "medium") {
			return "1rem"
		} else if (size === "large") {
			return "1.2rem"
		}
	}};
	padding: ${({ size }) => {
		if (size === "small") {
			return "0.5rem"
		} else if (size === "medium") {
			return "0.6rem"
		} else if (size === "large") {
			return "0.8rem"
		}
	}};
	transition: font-size 0.2s ease-in-out, background 0.2s ease;

	svg {
		path {
			stroke: ${({ theme }) => theme.appColors.white};
			stroke-width: 3px;
		}
	}

	&:hover {
		background: ${({ theme, addButton, cancelButton }) => getButtonColorOnHover(theme, addButton, cancelButton)};
		cursor: pointer;
	}
	&:disabled {
		background: ${({ theme }) => theme.colors.secondary};
		border: 0;
		outline: 0;
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		margin-bottom: 10%;
		padding: ${({ theme }) => `${theme.spacing.small} ${theme.spacing.medium}`};
	}
`

export default Button
