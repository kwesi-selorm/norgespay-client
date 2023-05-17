import SalaryCard from "./SalaryCard"
import { MainSalary } from "../../@types/types"
import styled from "styled-components"

type Props = {
	salaries: MainSalary[]
	displayFormat: string
}

const SalaryList = ({ salaries, displayFormat }: Props) => {
	return (
		<Wrapper displayFormat={displayFormat}>
			{salaries.map((salary) => (
				<SalaryCard
					key={salary._id}
					displayFormat={displayFormat}
					salary={salary}
				/>
			))}
		</Wrapper>
	)
}

const Wrapper = styled.div<{ displayFormat: string }>`
	display: ${({ displayFormat }) =>
		displayFormat === "grid" ? "grid" : "block"};
	gap: 1.5rem;
	grid-template-columns: ${({ displayFormat }) =>
		displayFormat === "grid"
			? "repeat(auto-fit, minmax(300px, 1fr))"
			: "repeat(1fr)"};
	margin-inline: auto;
	padding-inline: 1.5rem;
	width: 90%;

	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		gap: 0.5rem;
		grid-template-columns: minmax(250px, 1fr);
	}
`

export default SalaryList
