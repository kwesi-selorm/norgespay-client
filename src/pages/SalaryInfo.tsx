import styled from "styled-components"
import SalaryTable from "../components/data-display/SalaryTable.tsx"
import { useContext } from "react"
import { SalaryContext } from "../contexts/SalaryContext.tsx"
import Button from "../components/Button.tsx"
import CreateSecondarySalaryEntryModal from "../components/modals/CreateSecondarySalaryEntryModal.tsx"
import { ModalContext } from "../contexts/ModalContext.tsx"
import AddSecondarySalaryAmountModal from "../components/modals/AddSecondarySalaryAmountModal.tsx"

const SalaryInfo = () => {
	const { selectedMainSalary, secondarySalaryId } = useContext(SalaryContext)
	const { modalOpen, setModalOpen } = useContext(ModalContext)

	return selectedMainSalary !== null ? (
		<Wrapper>
			{modalOpen && secondarySalaryId !== null ? (
				<AddSecondarySalaryAmountModal title="Add New Salary Amount" />
			) : (
				<CreateSecondarySalaryEntryModal
					title={`Add company-specific ${selectedMainSalary.jobTitle} salary entry`}
				/>
			)}
			<SalaryTable
				jobTitle={selectedMainSalary?.jobTitle}
				city={selectedMainSalary?.city}
				secondarySalaries={selectedMainSalary?.salaries}
			/>
			<Button
				addButton={true}
				className="add-button"
				innerText="Add new entry"
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
