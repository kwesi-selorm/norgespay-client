import styled, { css } from "styled-components"
import * as dayjs from "dayjs"

type Props = {
	jobTitle: string
	city: string
	lastModified: Date | string
	displayFormat: string
}

const SalaryCard = ({ jobTitle, city, lastModified, displayFormat }: Props) => {
	const date = dayjs(lastModified).format("DD-MM-YYYY HH:mm")

	return (
		<Wrapper title="Select for more info" displayFormat={displayFormat}>
			<h2>{jobTitle}</h2>
			<h4>{city}</h4>
			<p>Last updated: {date}</p>
		</Wrapper>
	)
}

export default SalaryCard

const Wrapper = styled.article<{ displayFormat: string }>`
	background: ${({ theme }) => theme.appColors.blue};
	border-radius: ${({ theme }) => theme.borderRadius.extraLarge};
	box-shadow: rgba(0, 0, 0, 0.3) 0 19px 38px, rgba(0, 0, 0, 0.22) 0 15px 12px;
	color: ${({ theme }) => theme.appColors.white};
	${({ displayFormat }) =>
		displayFormat === "list" &&
		css`
			 {
				align-items: center;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-bottom: 1rem;
				padding-left: 1rem;
			}
		`}
	font-family: "Agrandir", sans-serif;
	margin-inline: auto;
	max-width: ${({ displayFormat }) =>
		displayFormat === "list" ? "60%" : "fit-content"};
	min-width: min(350px, fit-content);
	padding: 1rem 3.5rem 0.5rem;
	text-align: center;
	transition: transform 0.3s ease-in-out;

	h2,
	h4,
	p {
		margin: 0.5rem;
	}

	h2 {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 1.3rem;
	}
	h4 {
		font-family: "Agrandir Bold", sans-serif;
		font-size: 1.1rem;
	}
	p {
		font-size: 0.8rem;
	}

	&:hover {
		background: ${({ theme }) => theme.appColors.hoverBlue};
		cursor: pointer;
		transform: scale(1.05);
	}

	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		padding: 0.8rem 1rem 0.5rem;

		h2 {
			font-size: 1rem;
		}
		h4 {
			font-size: 0.8rem;
		}
		p {
			font-size: 0.5rem;
		}
	}
`
