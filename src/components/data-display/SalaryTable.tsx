import styled from "styled-components"
import { MainSalary, SecondarySalary } from "../../@types/types.ts"
import * as dayjs from "dayjs"
import theme from "../../styles/theme.ts"
import { formatNumberToCurrency } from "../../helpers/type-helper.ts"
import { IoMdAdd } from "react-icons/io"
import Button from "../Button.tsx"
import EmptyTable from "./EmptyTable.tsx"
import { useContext } from "react"
import { ModalContext } from "../../contexts/ModalContext.tsx"

type SalaryTableProps = {
	jobTitle: string
	city: string
	secondarySalaries: MainSalary["salaries"]
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
	secondarySalaries
}: SalaryTableProps) => {
	const { setModalOpen } = useContext(ModalContext)

	function parseDate(date: SecondarySalary["lastModified"]) {
		return dayjs(date).format("DD-MM-YYYY HH:mm")
	}

	return (
		<EmptyTable>
			<StyledCaption>
				<h3 className="content">
					{`${jobTitle} salaries in ${city}`.toLocaleUpperCase()}
				</h3>
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
					<StyledTr key={salary._id}>
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
									setModalOpen(true)
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

		li {
			margin: 0;
		}

		.add-button {
			align-items: center;
			display: none;

			svg {
				margin: 0;
			}
		}
	}
`

const StyledTr = styled.tr`
	transition: transform 0.3s ease-out;

	&:hover {
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

const StyledCaption = styled.caption`
	color: ${theme.appColors.hoverBlue};
	text-align: left;

	.content {
		font-family: "Agrandir Heavy", sans-serif;
		margin-bottom: 0.5rem;
	}
`

export default SalaryTable
