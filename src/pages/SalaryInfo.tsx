import styled from "styled-components"
import SalaryTable from "../components/data-display/SalaryTable"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import CreateSecondarySalaryModal from "../components/modals/CreateSecondarySalaryModal"
import { useQuery } from "@tanstack/react-query"
import { MainSalary } from "../@types/types"
import LoadingIcon from "../components/LoadingIcon"
import { useNavigate, useParams } from "react-router-dom"
import Layout from "../components/layout/Layout"
import ErrorPage from "./ErrorPage"
import useSalaryAPI from "../hooks/api/useSalaryAPI"

const SalaryInfo = () => {
	const [createModalOpen, setCreateModalOpen] = useState(false)
	const { getSalary } = useSalaryAPI()
	const { id } = useParams()
	const { data, error, isLoading, isError } = useQuery<MainSalary | undefined>(
		["salaries", "single", id],
		() => {
			if (id === null || id === undefined) return
			return getSalary(id)
		},
		{
			refetchOnWindowFocus: false,
			retry: 1
		}
	)
	const navigate = useNavigate()

	const salary = data

	useEffect(() => {
		if (salary?.salaries.length === 0) {
			navigate("/salaries")
		}
	}, [salary])

	if (isLoading) {
		return <LoadingIcon />
	}
	if (isError) {
		return <ErrorPage error={error} />
	}

	return salary !== undefined ? (
		<Layout>
			<Wrapper>
				<CreateSecondarySalaryModal
					createModalOpen={createModalOpen}
					setCreateModalOpen={setCreateModalOpen}
					title={`Add ${salary.jobTitle.toLowerCase()} salary entry`}
				/>

				<SalaryTable jobTitle={salary?.jobTitle} city={salary?.city} secondarySalaries={salary?.salaries} />
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
