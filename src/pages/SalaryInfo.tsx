import styled from "styled-components"
import SalaryTable from "../components/data-display/SalaryTable.tsx"
import { useState } from "react"
import Button from "../components/Button.tsx"
import CreateSecondarySalaryEntryModal from "../components/modals/CreateSecondarySalaryEntryModal.tsx"
import AddSecondarySalaryAmountModal from "../components/modals/AddSecondarySalaryAmountModal.tsx"
import { useQuery } from "@tanstack/react-query"
import { MainSalary } from "../@types/types.ts"
import { getSalary } from "../api/salaries-api.ts"
import useErrorHandler from "../hooks/useErrorHandler.tsx"
import LoadingIcon from "../components/LoadingIcon.tsx"
import { useParams } from "react-router-dom"
import BackButtonBar from "../components/BackButtonBar.tsx"

const SalaryInfo = () => {
	const [createModalOpen, setCreateModalOpen] = useState(false)
	const [addModalOpen, setAddModalOpen] = useState(false)

	const { id } = useParams()
	const { data, error, isLoading, isError } = useQuery<MainSalary | undefined>(
		["salaries", "single", id],
		() => {
			if (id === null || id === undefined) return
			return getSalary(id)
		},
		{
			refetchOnWindowFocus: false,
			retry: 2
		}
	)
	const { handleError, contextHolder } = useErrorHandler()

	const salary = data

	if (isLoading) {
		return <LoadingIcon />
	}
	if (isError) {
		handleError(error)
		return null
	}

	return salary !== undefined ? (
		<Wrapper>
			{contextHolder}
			<BackButtonBar />
			<AddSecondarySalaryAmountModal
				addModalOpen={addModalOpen}
				setAddModalOpen={setAddModalOpen}
				title="Add New Salary Amount"
			/>
			<CreateSecondarySalaryEntryModal
				createModalOpen={createModalOpen}
				setCreateModalOpen={setCreateModalOpen}
				title={`Add ${salary.jobTitle.toLowerCase()} salary entry`}
			/>

			<SalaryTable
				jobTitle={salary?.jobTitle}
				city={salary?.city}
				secondarySalaries={salary?.salaries}
				setAddModalOpen={setAddModalOpen}
			/>
			<Button
				addButton={true}
				className="add-button"
				innerText="Add new entry"
				onClick={() => {
					setCreateModalOpen(true)
				}}
				size="large"
				type="button"
			/>
		</Wrapper>
	) : null
}

const Wrapper = styled.div`
	margin-inline: auto;
	margin-top: 5%;
	width: 80%;

	.add-button {
		margin-inline: auto;
		margin-top: 1rem;
	}
`

export default SalaryInfo
