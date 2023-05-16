import styled from "styled-components"
import { MainSalary, SecondarySalary } from "../../@types/types.ts"
import * as dayjs from "dayjs"
import theme from "../../styles/theme.ts"

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
				return <StyledLi key={salary}>{salary}</StyledLi>
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
		<StyledTable>
			<StyledCaption>
				<h3 className="content">
					{`${jobTitle} salaries in ${city}`.toLocaleUpperCase()}
				</h3>
			</StyledCaption>
			<StyledThead>
				<StyledTr>
					<StyledTh scope="col">Position</StyledTh>
					<StyledTh scope="col">Experience</StyledTh>
					<StyledTh scope="col">Salaries</StyledTh>
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
						</StyledTd>
						<StyledTd>{parseDate(salary.lastModified)}</StyledTd>
					</StyledTr>
				))}
			</StyledTbody>
		</StyledTable>
	)
}

const StyledTd = styled.td``

const StyledTr = styled.tr`
	&:hover {
		background: ${theme.appColors.hoverBlue};
	}
`

const StyledTh = styled.th``

const StyledThead = styled.thead`
	background: ${theme.appColors.darkBlue};
`

const StyledTbody = styled.tbody``

const StyledCaption = styled.caption`
	color: ${theme.appColors.hoverBlue};
	font-family: Agrandir, sans-serif;
	text-align: left;

	.content {
		margin-bottom: 0.5rem;
	}
`

const StyledTable = styled.table`
	* {
		font-family: Agrandir, sans-serif;
	}
	background: ${theme.appColors.blue};
	color: ${theme.appColors.white};
	margin-inline: auto;
	min-width: 500px;
	overflow-x: auto;
	padding: 0 0 2rem;
	text-align: left;
	width: 85%;

	td,
	th {
		line-height: 1.5rem;
		padding: ${theme.spacing.small};
	}
`

export default SalaryTable
