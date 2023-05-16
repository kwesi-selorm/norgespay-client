import styled from "styled-components"
import { MainSalary, SecondarySalary } from "../../@types/types.ts"
import * as dayjs from "dayjs"
import theme from "../../styles/theme.ts"
import { formatNumberToCurrency } from "../../helpers/type-helper.ts"
import { IoMdAdd } from "react-icons/io"
import Button from "../Button.tsx"
import EmptyTable from "./EmptyTable.tsx"

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
					<StyledLi key={salary}>{formatNumberToCurrency(salary)}</StyledLi>
				)
			})}
		</Wrapper>
	)
}

const Wrapper = styled.div``
const StyledLi = styled.li`
	list-style: none;
`

const SalaryTable = ({
	jobTitle,
	city,
	secondarySalaries
}: SalaryTableProps) => {
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
						<StyledTd>
							<ContributedSalaries contributedSalaries={salary.salaries} />
							<Button
								addButton={true}
								icon={<IoMdAdd />}
								innerText="Add new"
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

const StyledTd = styled.td``

const StyledTr = styled.tr`
	transition: transform 0.3s ease-out;
	&:hover {
		background: ${theme.appColors.hoverBlue};
		transform: scale(1.05);
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
