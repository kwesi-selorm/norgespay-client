// import { MainSalary } from "../@types/types.ts"
import styled from "styled-components"
import { useState } from "react"
import LoadingIcon from "../components/LoadingIcon.tsx"
import Button from "../components/Button.tsx"
import { IoMdAdd } from "react-icons/io"
import { useQuery } from "@tanstack/react-query"
import { getSalaries } from "../api/salaries-api.ts"
import useErrorHandler from "../hooks/useErrorHandler.tsx"
import CustomModal from "../components/Modal.tsx"
import { MainSalary } from "../@types/types.ts"
import SalaryList from "../components/SalaryList.tsx"

const Salaries = () => {
	const [modalOpen, setModalOpen] = useState(false)
	const [displayFormat] = useState("grid")

	const { data, error, isLoading, isError } = useQuery<
		MainSalary[] | undefined
	>(["salaries, all"], getSalaries, {
		refetchOnWindowFocus: false,
		retry: 2
	})
	const { handleError, contextHolder } = useErrorHandler()

	const salaries = data !== undefined ? data : []

	if (isLoading) {
		return <LoadingIcon />
	}
	if (isError) {
		handleError(error)
		return
	}

	return (
		<Wrapper>
			{contextHolder}
			<CustomModal
				title="Add new salary entry"
				modalOpen={modalOpen}
				onCancel={() => setModalOpen(false)}
				onSubmit={() => {
					console.log("submit")
				}}
			>
				<h1>Children</h1>
			</CustomModal>
			<SalaryList salaries={salaries} displayFormat={displayFormat} />
			<Button
				addButton={true}
				className="add-button"
				icon={<IoMdAdd />}
				innerText="Add new"
				onClick={() => setModalOpen(true)}
				size="small"
				type="button"
			/>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	margin-inline: 20px;
	margin-top: 5%;
	text-align: left;

	.add-button {
		margin-inline: auto;
		margin-top: 2rem;
	}
`

export default Salaries
