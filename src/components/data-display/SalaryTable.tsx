import styled from "styled-components"
import { MainSalary } from "../../@types/types"
import theme from "../../styles/theme"
import {
	formatNumberToCurrency,
	parseToLocaleDate
} from "../../helpers/type-helper"
import { IoMdAdd } from "react-icons/io"
import Button from "../Button"
import EmptyTable from "./EmptyTable"
import { Dispatch, SetStateAction, useContext } from "react"
import { SalaryContext } from "../../contexts/SalaryContext"
import addTableARIA from "../../util/table-aria"

type SalaryTableProps = {
	jobTitle: string
	city: string
	secondarySalaries: MainSalary["salaries"]
	setAddModalOpen: Dispatch<SetStateAction<boolean>>
}
type ContributedSalariesProps = {
	contributedSalaries: number[]
}

const ContributedSalaries = ({
	contributedSalaries
}: ContributedSalariesProps) => {
	return (
		<Wrapper>
			{contributedSalaries.map((salary) => {
				return (
					<li key={salary} style={{ listStyle: "none" }}>
						{formatNumberToCurrency(salary)}
					</li>
				)
			})}
		</Wrapper>
	)
}

const Wrapper = styled.ul`
	margin: 0;
	max-height: 5rem;
	padding-left: 0;

	li:last-of-type {
		padding-bottom: ${theme.spacing.small};
	}
`

const SalaryTable = ({
	jobTitle,
	city,
	secondarySalaries,
	setAddModalOpen
}: SalaryTableProps) => {
	const { setSecondarySalaryId } = useContext(SalaryContext)

	addTableARIA()

	return (
		<StyledEmptyTable>
			<StyledCaption>
				<h3 className="content">{`${jobTitle}, ${city}`}</h3>
			</StyledCaption>
			<StyledThead>
				<StyledTr>
					<StyledTh scope="col">Position</StyledTh>
					<StyledTh scope="col">Experience (yrs)</StyledTh>
					<StyledTh scope="col">Salaries (NOK)</StyledTh>
					<StyledTh scope="col">Last Updated</StyledTh>
				</StyledTr>
			</StyledThead>
			<StyledTbody>
				{secondarySalaries.map((salary) => (
					<StyledTr className="body-row" key={salary._id}>
						<StyledTh data-cell="Position" className="position-cell">
							{salary.companySpecificJobTitle}
						</StyledTh>
						<StyledTd data-cell="Experience (yrs)" className="experience-cell">
							{salary.experience}
						</StyledTd>
						<StyledTd data-cell="Salaries (NOK)" className="salaries-cell">
							<ContributedSalaries contributedSalaries={salary.salaries} />
						</StyledTd>
						<StyledTd data-cell="Last Updated" className="last-updated-cell">
							{parseToLocaleDate(salary.lastModified)}
							<Button
								addButton={true}
								className="add-button"
								icon={<IoMdAdd />}
								innerText=""
								onClick={() => {
									setSecondarySalaryId(salary._id)
									setAddModalOpen(true)
								}}
								size="small"
								type="button"
							></Button>
						</StyledTd>
					</StyledTr>
				))}
			</StyledTbody>
		</StyledEmptyTable>
	)
}

const StyledEmptyTable = styled(EmptyTable)`
	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		width: 100%;
		td {
			padding-block: ${({ theme }) => theme.spacing.extraSmall};
			font-size: 1rem;
		}
	}
`

const StyledCaption = styled.caption`
	color: ${theme.appColors.hoverBlue};

	.content {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
		text-transform: uppercase;
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		font-size: 0.8rem;
		text-align: left;
	}
`

const StyledThead = styled.thead`
	background: ${theme.appColors.darkBlue};

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		display: none;
	}
`

const StyledTh = styled.th`
	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		&.position-cell {
			display: block;
			font-family: Agrandir Heavy, sans-serif;
			font-size: 0.9rem;
			padding-block: ${({ theme }) => theme.spacing.extraSmall};
		}
	}
`

const StyledTbody = styled.tbody``

const StyledTr = styled.tr`
	transition: transform 0.3s ease-out;

	&.body-row:hover {
		background: ${theme.appColors.hoverBlue};
		transform: scale(1.05);

		.add-button {
			display: flex;
		}
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		td:last-child {
			padding-bottom: 2rem;
		}
	}
`

const StyledTd = styled.td`
	&.salaries-cell {
		overflow-y: auto;

		::-webkit-scrollbar {
			-webkit-appearance: none;
			width: 7px;
		}

		::-webkit-scrollbar-thumb {
			border-radius: 4px;
			background-color: rgba(0, 0, 0, 0.5);
		}

		::-webkit-scrollbar-track {
			margin: ${({ theme }) => `
				${theme.spacing.small} 0
				${theme.spacing.medium}
			`};
		}
	}

	&.last-updated-cell {
		align-items: center;
		display: flex;
		flex-direction: column;

		.add-button {
			align-items: center;
			display: none;
			margin: 0;
			svg {
				margin: 0;
			}
		}
	}

	&.last-updated-cell:hover {
		.add-button {
			display: flex;
			svg {
				margin: 0;
			}
		}
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		display: block;

		&::before {
			content: attr(data-cell) ": ";
		}

		&.last-updated-cell {
			align-items: flex-start;
		}
	}
`

export default SalaryTable
