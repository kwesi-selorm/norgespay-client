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

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

const SalaryTable = ({
	jobTitle,
	city,
	secondarySalaries,
	setAddModalOpen
}: SalaryTableProps) => {
	const { setSecondarySalaryId } = useContext(SalaryContext)

	return (
		<StyledEmptyTable>
			<StyledCaption>
				<h3 className="content">{`${jobTitle} salaries in ${city}`}</h3>
			</StyledCaption>
			<StyledThead>
				<StyledTr>
					<StyledTh scope="col">Position</StyledTh>
					<StyledTh scope="col">Experience (years)</StyledTh>
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
						<StyledTd
							data-cell="Experience (years)"
							className="experience-cell"
						>
							{salary.experience}
						</StyledTd>
						<StyledTd data-cell="Salaries (NOK)" className="salaries-cell">
							<ContributedSalaries contributedSalaries={salary.salaries} />
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
						<StyledTd data-cell="Last Updated" className="last-updated-cell">
							{parseToLocaleDate(salary.lastModified)}
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
		}
	}
`

const StyledCaption = styled.caption`
	color: ${theme.appColors.hoverBlue};

	.content {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 1.1rem;
		margin-bottom: 0.5rem;
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
			padding-block: ${({ theme }) => theme.spacing.extraSmall};
		}
		&::before {
			content: attr(data-cell) ": ";
			font-family: Agrandir Bold, sans-serif;
			text-transform: capitalize;
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
		td:last-of-type {
			padding-bottom: 3rem;
		}
	}
`

const StyledTd = styled.td`
	&.salaries-cell {
		align-items: center;
		display: flex;
		gap: 0.4rem;
		max-height: 5rem;
		overflow-y: scroll;

		::-webkit-scrollbar {
			-webkit-appearance: none;
			width: 7px;
		}

		::-webkit-scrollbar-thumb {
			border-radius: 4px;
			background-color: rgba(0, 0, 0, 0.5);
		}

		li {
			margin: 0;
		}

		.add-button {
			align-items: center;
			display: none;
			margin: 0;

			svg {
				margin: 0;
			}
		}
	}

	@media screen and (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		display: block;

		&::before {
			content: attr(data-cell) ": ";
			font-family: Agrandir Bold, sans-serif;
		}
		//margin-block: 0.5rem;
	}
`

export default SalaryTable
