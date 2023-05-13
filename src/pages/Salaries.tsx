import { MainSalary } from "../@types/types.ts"
import SalaryList from "../components/SalaryList.tsx"
import styled from "styled-components"

const Salaries = () => {
	const salaries = [] as MainSalary[]
	const displayFormat = ""

	return (
		<Wrapper>
			<SalaryList salaries={salaries} displayFormat={displayFormat} />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: 20px;
`

export default Salaries
