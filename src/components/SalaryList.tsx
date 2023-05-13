import SalaryCard from "./SalaryCard.tsx"
import { MainSalary } from "../@types/types.ts"
import styled from "styled-components"

type Props = {
	salaries: MainSalary[]
}

const SalaryList = ({ salaries }: Props) => {
	return (
		<Wrapper>
			{salaries.map((salary) => (
				<SalaryCard
					key={salary._id}
					jobTitle={salary.jobTitle}
					city={salary.city}
					lastModified={salary.lastModified}
				/>
			))}
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: grid;
	gap: 1.5rem;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	margin-inline: auto;
	padding-inline: 1.5rem;
	width: 90%;

	@media (max-width: ${({ theme }) => theme.screenWidth.mobile}) {
		gap: 0.5rem;
		grid-template-columns: minmax(250px, 1fr);
	}
`

export default SalaryList
