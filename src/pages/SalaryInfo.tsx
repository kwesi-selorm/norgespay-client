import styled from "styled-components"
import SalaryTable from "../components/data-display/SalaryTable.tsx"
import { useContext } from "react"
import { SalaryContext } from "../contexts/SalaryContext.tsx"
import Button from "../components/Button.tsx"
import CreateSecondarySalaryEntryModal from "../components/modals/CreateSecondarySalaryEntryModal.tsx"
import { ModalContext } from "../contexts/ModalContext.tsx"

const SalaryInfo = () => {
	const { selectedMainSalary } = useContext(SalaryContext)
	const { setModalOpen } = useContext(ModalContext)

	return selectedMainSalary !== null ? (
		<Wrapper>
			<CreateSecondarySalaryEntryModal
				title={`Add company-specific ${selectedMainSalary.jobTitle} salary`}
			/>
			<SalaryTable
				jobTitle={selectedMainSalary?.jobTitle}
				city={selectedMainSalary?.city}
				secondarySalaries={selectedMainSalary?.salaries}
			/>
			<Button
				addButton={true}
				className="add-button"
				innerText="Add new company-specific salary"
				onClick={() => {
					setModalOpen(true)
				}}
				size="large"
				type="button"
			/>
		</Wrapper>
	) : null
}

const Wrapper = styled.div`
	width: 80%;

	.add-button {
		margin-top: 1rem;
	}
`

export default SalaryInfo
