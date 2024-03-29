import styled from "styled-components"
import SalaryTable from "../components/data-display/SalaryTable"
import { useState } from "react"
import Button from "../components/Button"
import CreateSecondarySalaryEntryModal from "../components/modals/CreateSecondarySalaryEntryModal"
import AddSecondarySalaryAmountModal from "../components/modals/AddSecondarySalaryAmountModal"
import { useQuery } from "@tanstack/react-query"
import { MainSalary } from "../@types/types"
import { getSalary } from "../api/salaries-api"
import LoadingIcon from "../components/LoadingIcon"
import { useParams } from "react-router-dom"
import Layout from "../components/layout/Layout"
import ErrorPage from "./ErrorPage"

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

	const salary = data

	if (isLoading) {
		return <LoadingIcon />
	}
	if (isError) {
		return <ErrorPage error={error} />
	}

	return salary !== undefined ? (
		<Layout>
			<Wrapper>
				<AddSecondarySalaryAmountModal
					addModalOpen={addModalOpen}
					setAddModalOpen={setAddModalOpen}
					title="Add salary amount"
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
		</Layout>
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
