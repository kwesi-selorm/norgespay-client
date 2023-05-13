import styled from "styled-components"

type Props = {
	innerText: string
	size?: string
}

const Button = ({ innerText, size }: Props) => {
	return <StyledButton size={size}>{innerText}</StyledButton>
}

const StyledButton = styled.button<{ size: string | undefined }>`
	background: ${({ theme }) => theme.appColors.blue};
	border-radius: ${({ theme }) => theme.borderRadius.medium};
	color: ${({ theme }) => theme.appColors.white};
	font-family: "Agrandir", sans-serif;
	font-size: ${({ size }) => (size === "small" ? "0.9rem" : "1rem")};
	border: 0;
	padding: ${({ theme, size }) =>
		size === "small" ? theme.spacing.small : theme.spacing.medium};

	&:hover {
		background-color: ${({ theme }) => theme.appColors.hoverBlue};
	}
`

export default Button
