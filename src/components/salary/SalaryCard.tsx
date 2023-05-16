import styled from "styled-components"
import * as dayjs from "dayjs"
import EmptyTable from "../data-display/EmptyTable.tsx"
import theme from "../../styles/theme.ts"
import { useNavigate } from "react-router-dom"
import { MainSalary } from "../../@types/types.ts"

type Props = {
	displayFormat: string
	salary: MainSalary
}

const SalaryCard = ({ displayFormat, salary }: Props) => {
	const navigate = useNavigate()
	const date = dayjs(salary.lastModified).format("DD-MM-YYYY HH:mm")

	function navigateToSalaryInfo() {
		navigate(`/salaries/${salary._id}`)
	}

	return displayFormat === "grid" ? (
		<Wrapper
			title="Select for more info"
			displayFormat={displayFormat}
			onClick={navigateToSalaryInfo}
		>
			<h2>{salary.jobTitle}</h2>
			<h4>{salary.city}</h4>
			<p>Last updated: {date}</p>
		</Wrapper>
	) : (
		<TableWrapper onClick={navigateToSalaryInfo}>
			<EmptyTable className="salary-card-item">
				<StyledTr>
					<StyledTd className="job-title-cell">{salary.jobTitle}</StyledTd>
					<StyledTd>{salary.city}</StyledTd>
					<StyledTd>{`Last updated: ${date}`}</StyledTd>
				</StyledTr>
			</EmptyTable>
		</TableWrapper>
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
	max-width: ${({ displayFormat }) =>
		displayFormat === "list" ? "60%" : "fit-content"};
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

const TableWrapper = styled.div`
	display: flex;
	gap: 1rem;

	.salary-card-item {
		margin-bottom: 0.5rem;
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
