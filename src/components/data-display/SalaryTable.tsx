import styled from "styled-components"
import { MainSalary, SecondarySalary } from "../../@types/types"
import * as dayjs from "dayjs"
import theme from "../../styles/theme"
import { formatNumberToCurrency } from "../../helpers/type-helper"
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

	function parseDate(date: SecondarySalary["lastModified"]) {
		return dayjs(date).format("DD-MM-YYYY HH:mm")
	}

	return (
		<EmptyTable>
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
						<StyledTh>{salary.companySpecificJobTitle}</StyledTh>
						<StyledTd>{salary.experience}</StyledTd>
						<StyledTd className="contributed-salaries-cell">
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
						<StyledTd>{parseDate(salary.lastModified)}</StyledTd>
					</StyledTr>
				))}
			</StyledTbody>
		</EmptyTable>
	)
}

const StyledTd = styled.td`
	&.contributed-salaries-cell {
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
`

const StyledCaption = styled.caption`
	color: ${theme.appColors.hoverBlue};

	.content {
		font-family: "Agrandir Heavy", sans-serif;
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}
`

const StyledTr = styled.tr`
	transition: transform 0.3s ease-out;

	&.body-row:hover {
		background: ${theme.appColors.hoverBlue};
		transform: scale(1.05);

		.add-button {
			display: flex;
		}
	}
`

const StyledTh = styled.th``

const StyledThead = styled.thead`
	background: ${theme.appColors.darkBlue};
`

const StyledTbody = styled.tbody``

export default SalaryTable
