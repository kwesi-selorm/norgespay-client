import { MainSalary } from "../@types/types.ts"
import SalaryCard from "../components/SalaryCard.tsx"
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

export default SalaryList

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
`
