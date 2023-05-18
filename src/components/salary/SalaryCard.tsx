import styled from "styled-components"
import EmptyTable from "../data-display/EmptyTable"
import theme from "../../styles/theme"
import { useNavigate } from "react-router-dom"
import { MainSalary } from "../../@types/types"
import { parseToLocaleDate } from "../../helpers/type-helper"
import { Tooltip } from "antd"

type Props = {
	displayFormat: string
	salary: MainSalary
}

const SalaryCard = ({ displayFormat, salary }: Props) => {
	const navigate = useNavigate()

	function navigateToSalaryInfo() {
		navigate(`/salaries/${salary._id}`)
	}

	return displayFormat === "grid" ? (
		<Tooltip title="Click for more information">
			<Wrapper
				title="Select for more info"
				displayFormat={displayFormat}
				onClick={navigateToSalaryInfo}
			>
				<h2>{salary.jobTitle}</h2>
				<h4>{salary.city}</h4>
				<p>Last updated: {parseToLocaleDate(salary.lastModified)}</p>
			</Wrapper>
		</Tooltip>
	) : (
		<Tooltip title="Click for more information">
			<TableWrapper onClick={navigateToSalaryInfo}>
				<EmptyTable className="salary-card-item">
					<StyledTbody>
						<StyledTr>
							<StyledTd className="job-title-cell">{salary.jobTitle}</StyledTd>
							<StyledTd>{salary.city}</StyledTd>
							<StyledTd className="last-updated">{`Last updated: ${parseToLocaleDate(
								salary.lastModified
							)}`}</StyledTd>
						</StyledTr>
					</StyledTbody>
				</EmptyTable>
			</TableWrapper>
		</Tooltip>
	)
}

export default SalaryCard

const Wrapper = styled.article<{ displayFormat: string }>`
	background: ${({ theme }) => theme.appColors.blue};
	border-radius: ${({ theme }) => theme.borderRadius.extraLarge};
	box-shadow: rgba(0, 0, 0, 0.3) 0 19px 38px, rgba(0, 0, 0, 0.22) 0 15px 12px;
	color: ${({ theme }) => theme.appColors.white};
	font-family: "Agrandir", sans-serif;
	margin-inline: auto;
	min-width: min(350px, fit-content);
	padding: 1rem 3.5rem 0.5rem;
	text-align: center;
	transition: transform 0.3s ease-in-out;

	.job-title-cell {
		font-family: "Agrandir Heavy", sans-serif;
	}

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
		padding: 0.5rem 0.7rem 0.5rem;
		width: 100%;

		h2 {
			font-size: 0.8rem;
		}
		h4 {
			font-size: 0.6rem;
		}
		p {
			font-size: 0.5rem;
		}
		h2,
		h4,
		p {
			margin: 0.2rem;
		}
	}
`

const TableWrapper = styled.div`
	gap: 1rem;

	.salary-card-item {
		margin-bottom: 0.5rem;
	}

	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		* {
			font-size: 1rem;
		}
		margin-inline: auto;
		.salary-card-item {
			width: 100%;

			.last-updated {
				display: none;
			}
		}
	}
`

const StyledTr = styled.tr`
	padding: ${theme.spacing.medium};
	transition: transform 0.3s ease-out;

	&:hover {
		background: ${theme.appColors.hoverBlue};
		transform: scale(1.05);
	}
`
const StyledTd = styled.td`
	&.job-title-cell {
		font-family: "Agrandir Heavy", sans-serif;
	}
`

const StyledTbody = styled.tbody``
