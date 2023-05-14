import { MainSalary } from "../@types/types.ts"
import styled from "styled-components"
import { lazy, Suspense } from "react"
import LoadingIcon from "../components/LoadingIcon.tsx"
const SalaryList = lazy(() => import("../components/SalaryList.tsx"))

const Salaries = () => {
	const salaries = [] as MainSalary[]
	const displayFormat = ""

	return (
		<Wrapper>
			<Suspense fallback={<LoadingIcon />}>
				<SalaryList salaries={salaries} displayFormat={displayFormat} />
			</Suspense>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: 20px;
`

export default Salaries
